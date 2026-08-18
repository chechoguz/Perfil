"""
Descarga los indicadores de ocupación y desocupación de la Encuesta Nacional
de Empleo (ENE) desde la API SDMX del INE de Chile y los normaliza a JSON
para el frontend.

Fuente: https://www.ine.gob.cl/estadisticas-por-tema/mercado-laboral/ocupacion-y-desocupacion
API:    https://sdmx.ine.gob.cl/rest/data/CL01,{DATAFLOW},1.0
"""

from __future__ import annotations

import csv
import io
import json
import sys
from datetime import date
from pathlib import Path
from urllib.error import URLError
from urllib.request import Request, urlopen

BASE = "https://sdmx.ine.gob.cl/rest/data"
AGENCIA = "CL01"
VERSION = "1.0"
# Tasa de desocupación nacional y regional, según sexo.
# Filtro: frecuencia mensual, indicador TDES, área nacional (_T), ambos sexos (AS).
DATAFLOW_TDES = "DF_TDES_SEXO"
DATAFLOW_SU2 = "DF_SU2_SEXO"
DATAFLOW_TOI = "DF_TOI_SEXO"
KEY = "M.._T.AS"
START = "2015-01"

SALIDA = Path("assets/data/mercado-laboral.json")
TIMEOUT = 60


def descargar_sdmx(dataflow: str) -> str:
    url = f"{BASE}/{AGENCIA},{dataflow},{VERSION}/{KEY}?format=csv&startPeriod={START}"
    req = Request(url, headers={"Accept": "application/vnd.sdmx.data+csv"})
    with urlopen(req, timeout=TIMEOUT) as resp:
        return resp.read().decode("utf-8")


def parse_serie(text: str) -> list[dict]:
    rows = list(csv.DictReader(io.StringIO(text)))
    by_period: dict[str, float] = {}
    for row in rows:
        if row.get("AREA_REF") != "_T" or row.get("SEXO") != "AS":
            continue
        raw = row.get("OBS_VALUE")
        if not raw:
            continue
        periodo = row["TIME_PERIOD"].split("/")[0][:7]
        by_period[periodo] = round(float(raw), 1)
    return [{"periodo": k, "valor": by_period[k]} for k in sorted(by_period)]


def ultimo(serie: list[dict]) -> dict:
    if not serie:
        raise ValueError("La serie vino vacía: revisar DATAFLOW y filtros de dimensión")
    return serie[-1]


def variacion_12m(serie: list[dict]) -> float | None:
    if len(serie) < 13:
        return None
    return round(serie[-1]["valor"] - serie[-13]["valor"], 1)


def etiqueta_trimestre(periodo: str) -> str:
    year, month = periodo.split("-")
    start = int(month)
    meses = [
        "ene", "feb", "mar", "abr", "may", "jun",
        "jul", "ago", "sep", "oct", "nov", "dic",
    ]
    # SDMX TIME_PERIOD es el inicio del trimestre móvil (P3M).
    ini = meses[start - 1]
    end = start + 2
    if end > 12:
        fin = meses[end - 13]
        y_fin = str(int(year) + 1)
    else:
        fin = meses[end - 1]
        y_fin = year
    if year == y_fin:
        return f"{ini}–{fin} {year}"
    return f"{ini} {year}–{fin} {y_fin}"


def main() -> int:
    try:
        serie_tdes = parse_serie(descargar_sdmx(DATAFLOW_TDES))
        serie_su2 = parse_serie(descargar_sdmx(DATAFLOW_SU2))
        serie_toi = parse_serie(descargar_sdmx(DATAFLOW_TOI))
        last = ultimo(serie_tdes)
        su2 = ultimo(serie_su2) if serie_su2 else None
        toi = ultimo(serie_toi) if serie_toi else None
        datos = {
            "fuente": "INE Chile — Encuesta Nacional de Empleo (ENE)",
            "url_fuente": "https://www.ine.gob.cl/estadisticas-por-tema/mercado-laboral/ocupacion-y-desocupacion",
            "licencia": "https://www.ine.gob.cl/terminos-de-uso-y-licencia-de-datos-abiertos",
            "actualizado": date.today().isoformat(),
            "ultimo_periodo": last["periodo"],
            "ultimo_periodo_etiqueta": etiqueta_trimestre(last["periodo"]),
            "tasa_desocupacion": last["valor"],
            "variacion_12m": variacion_12m(serie_tdes),
            "tasa_su2": su2["valor"] if su2 else None,
            "tasa_ocupacion_informal": toi["valor"] if toi else None,
            "serie": serie_tdes,
        }
    except (URLError, TimeoutError, ValueError, KeyError, OSError) as exc:
        print(f"ERROR al actualizar datos del INE: {exc}", file=sys.stderr)
        return 1

    SALIDA.parent.mkdir(parents=True, exist_ok=True)
    SALIDA.write_text(json.dumps(datos, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"OK — {datos['ultimo_periodo']}: {datos['tasa_desocupacion']}%")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
