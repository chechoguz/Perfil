"""Generate ATS-friendly CV HTML and print to PDF with Edge/Chrome."""
from __future__ import annotations

import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "cv"
OUT.mkdir(parents=True, exist_ok=True)

CSS = """
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: Arial, Helvetica, sans-serif; color: #222; line-height: 1.45; max-width: 800px; margin: 0 auto; padding: 36px 32px; font-size: 11pt; }
h1 { font-size: 18pt; letter-spacing: 0.4px; margin-bottom: 4px; }
.role { font-size: 11.5pt; font-weight: 700; margin-bottom: 4px; }
.contact { font-size: 10pt; color: #444; margin-bottom: 14px; }
h2 { font-size: 12pt; border-bottom: 1.5px solid #333; padding-bottom: 3px; margin: 16px 0 8px; text-transform: uppercase; }
.job { margin-bottom: 12px; }
.job-header { margin-bottom: 2px; }
.job-title { font-weight: bold; }
.job-company { color: #444; font-size: 10pt; }
.job-date { font-size: 10pt; color: #555; }
.context { font-size: 10pt; font-style: italic; color: #444; margin: 3px 0 4px; }
ul { padding-left: 18px; margin: 4px 0; }
li { font-size: 10.5pt; margin-bottom: 3px; }
.summary { font-size: 10.5pt; margin-bottom: 6px; }
.edu { margin-bottom: 8px; }
p { font-size: 10.5pt; margin-bottom: 6px; }
@media print { body { padding: 16px; } }
"""

def page(lang, title, body):
    return f"""<!DOCTYPE html>
<html lang="{lang}">
<head>
<meta charset="UTF-8">
<title>{title}</title>
<meta name="author" content="Sergio Herrera Toloza">
<meta name="keywords" content="Jefe de Proyecto TI, Project Manager, PMBOK, Agile, licitaciones públicas, sector público, Data Science, IA, Barcelona, Chile">
<style>{CSS}</style>
</head>
<body>
{body}
</body>
</html>
"""

ES_BCN = page("es-ES", "Sergio Herrera Toloza — Jefe de Proyecto TI", """
<h1>SERGIO HERRERA TOLOZA</h1>
<p class="role">Jefe de Proyecto TI · Gestión Pública · Data Science &amp; IA</p>
<p class="contact">Barcelona, España | sherrera@fen.uchile.cl | linkedin.com/in/sergio-herrera-toloza</p>
<h2>Perfil profesional</h2>
<p class="summary">Jefe de Proyecto con más de 10 años liderando iniciativas TI y de transformación digital en la administración pública y privada chilena, incluyendo 6 años en cargos de dirección. Dirigí la licitación de más de 8 M€ para la Bolsa Nacional de Empleo (BNE, plataforma pública nacional de intermediación laboral de Chile) 2025–2029 y participé en la actualización de la Política Nacional de IA de Chile. Máster en Inteligencia Artificial para los Negocios (EAE, Barcelona), que combina gestión estratégica de alto nivel con capacidad técnica en Data Science e IA.</p>
<h2>Experiencia profesional</h2>
<div class="job">
  <div class="job-header"><span class="job-title">Jefe de Departamento – BNE</span> · <span class="job-company">Subsecretaría del Trabajo, Gobierno de Chile</span><br><span class="job-date">Mayo 2022 – Diciembre 2025</span></div>
  <p class="context">Departamento de la Bolsa Nacional de Empleo (BNE): plataforma pública nacional de intermediación laboral de Chile, país de ~20 millones de habitantes.</p>
  <ul>
    <li>Lideré la licitación pública de más de 8 M€ para la plataforma BNE 2025–2029, adjudicando el contrato en plazo y garantizando la continuidad operativa de un portal con más de 500.000 usuarios activos anuales.</li>
    <li>Reduje el time-to-market de nuevos desarrollos en torno a un 30%, definiendo lineamientos estratégicos y planes de acción trimestrales alineados con 4 objetivos ministeriales clave.</li>
    <li>Coordinación técnica en la actualización de la Política Nacional de Inteligencia Artificial de Chile.</li>
    <li>Gestión de procesos de licitación pública garantizando la continuidad operativa de servicios digitales críticos.</li>
  </ul>
</div>
<div class="job">
  <div class="job-header"><span class="job-title">Encargado de Procesos y Convenios</span> · <span class="job-company">Colegio Médico de Chile A.G.</span><br><span class="job-date">Septiembre 2019 – Enero 2022</span></div>
  <ul>
    <li>Escalé la transformación digital implementando firma electrónica y pago en línea, reduciendo un 40% los trámites presenciales y estandarizando más de 15 procesos institucionales.</li>
    <li>Diseñé y cerré 6 convenios estratégicos con aliados externos, incrementando un 25% la base de servicios disponibles para más de 18.000 colegiados.</li>
    <li>Coordinación de proyectos de transformación digital con proveedores y equipos internos.</li>
  </ul>
</div>
<div class="job">
  <div class="job-header"><span class="job-title">Ingeniero de Planificación</span> · <span class="job-company">Agencia de Calidad de la Educación</span><br><span class="job-date">Febrero 2019 – Agosto 2019</span></div>
  <ul>
    <li>Planificación y control operativo de visitas técnicas de evaluación a establecimientos educacionales a nivel nacional.</li>
    <li>Coordinación logística y seguimiento de indicadores de gestión operativa.</li>
  </ul>
</div>
<div class="job">
  <div class="job-header"><span class="job-title">Encargado de Operaciones / Planificación y Control de Gestión</span> · <span class="job-company">Servicio de Registro Civil e Identificación</span><br><span class="job-date">Abril 2016 – Junio 2018</span></div>
  <ul>
    <li>Optimicé el seguimiento de 12 metas institucionales (CMI / Balanced Scorecard, ADP y PMG), alcanzando un cumplimiento del 94% en 2017, 8 puntos porcentuales sobre el año anterior.</li>
    <li>Gestioné una cartera de 2 proyectos en las plataformas BIP (sistema nacional de inversión pública) y Chile Indica, con presupuesto combinado superior a ~300 mil €, asegurando el reporte oportuno al Ministerio de Hacienda.</li>
    <li>Supervisión operativa de oficinas regionales y capacitación en procesos y normativas institucionales.</li>
  </ul>
</div>
<div class="job">
  <div class="job-header"><span class="job-title">Analista de Control de Gestión y Procesos</span> · <span class="job-company">SVS (hoy CMF) / Univ. de Viña del Mar / Cepech</span><br><span class="job-date">Mayo 2012 – Febrero 2015</span></div>
  <ul>
    <li>Estandarización de información para control presupuestario y gestión de licitaciones públicas en 3 organizaciones.</li>
    <li>Elaboración de mapas estratégicos e informes de gestión para alta dirección.</li>
    <li>Gestión de matrices de riesgo y mejora de plataformas digitales de atención ciudadana.</li>
  </ul>
</div>
<h2>Formación</h2>
<div class="edu"><strong>Máster en Inteligencia Artificial para los Negocios</strong> — EAE Business School, Barcelona (2025–2026, completado)</div>
<div class="edu"><strong>Ingeniero en Información y Control de Gestión</strong> — Universidad de Chile, Facultad de Economía y Negocios. Título profesional de 10 semestres, equivalente a grado + máster en el sistema europeo (sujeto a homologación).</div>
<p><strong>Otros cursos:</strong> Analista Data Science con Python (354 h) · Desarrollador Full Stack JavaScript (440 h) · Preparación y Evaluación Social de Proyectos (80 h).</p>
<h2>Competencias clave</h2>
<p><strong>Gestión de Proyectos TI:</strong> Dirección de licitaciones públicas (ChileCompra / BID), gestión de contratos con proveedores TI, planificación de cartera, control de alcance/plazo/presupuesto, CMI, PMBOK, Agile.</p>
<p><strong>Sector público:</strong> Más de 10 años en administración pública. Gestión presupuestaria, indicadores ADP/PMG, política de IA, digitalización de servicios.</p>
<p><strong>Data Science &amp; IA:</strong> Python (Pandas, Scikit-learn, TensorFlow), Machine Learning, análisis de datos, automatización, KPIs.</p>
<p><strong>Desarrollo:</strong> JavaScript · Node.js · React · SQL · REST APIs · HTML/CSS.</p>
<p><strong>Idiomas:</strong> Español (nativo) · Inglés (intermedio).</p>
""")

ES_SCL = page("es-CL", "Sergio Herrera Toloza — Jefe de Proyecto TI", """
<h1>SERGIO HERRERA TOLOZA</h1>
<p class="role">Jefe de Proyecto TI · Gestión Pública · Data Science &amp; IA</p>
<p class="contact">Santiago, Chile · Disponible en remoto | sherrera@fen.uchile.cl | linkedin.com/in/sergio-herrera-toloza</p>
<h2>Perfil profesional</h2>
<p class="summary">Jefe de Proyecto con más de 10 años liderando iniciativas TI y de transformación digital en la administración pública y privada chilena, incluyendo 6 años en cargos de dirección. Dirigí la licitación de más de 8 M€ (BNE 2025–2029) y participé en la actualización de la Política Nacional de IA de Chile. Máster en Inteligencia Artificial para los Negocios (EAE, Barcelona): credencial internacional con capacidad técnica real en Data Science e IA.</p>
<h2>Experiencia profesional</h2>
<div class="job">
  <div class="job-header"><span class="job-title">Jefe de Departamento – BNE</span> · <span class="job-company">Subsecretaría del Trabajo, Gobierno de Chile</span><br><span class="job-date">Mayo 2022 – Diciembre 2025</span></div>
  <ul>
    <li>Lideré la licitación pública de más de 8 M€ / ~CLP 8.000 millones para la plataforma BNE 2025–2029, adjudicando el contrato en plazo y garantizando la continuidad operativa de un portal con más de 500.000 usuarios activos anuales.</li>
    <li>Reduje el time-to-market de nuevos desarrollos en torno a un 30%, definiendo lineamientos estratégicos y planes de acción trimestrales alineados con 4 objetivos ministeriales clave.</li>
    <li>Coordinación técnica en la actualización de la Política Nacional de Inteligencia Artificial de Chile.</li>
    <li>Gestión de procesos de licitación pública garantizando la continuidad operativa de servicios digitales críticos.</li>
  </ul>
</div>
<div class="job">
  <div class="job-header"><span class="job-title">Encargado de Procesos y Convenios</span> · <span class="job-company">Colegio Médico de Chile A.G.</span><br><span class="job-date">Septiembre 2019 – Enero 2022</span></div>
  <ul>
    <li>Escalé la transformación digital implementando firma electrónica y pago en línea, reduciendo un 40% los trámites presenciales y estandarizando más de 15 procesos institucionales.</li>
    <li>Diseñé y cerré 6 convenios estratégicos con aliados externos, incrementando un 25% la base de servicios disponibles para más de 18.000 colegiados.</li>
    <li>Coordinación de proyectos de transformación digital con proveedores y equipos internos.</li>
  </ul>
</div>
<div class="job">
  <div class="job-header"><span class="job-title">Ingeniero de Planificación</span> · <span class="job-company">Agencia de Calidad de la Educación</span><br><span class="job-date">Febrero 2019 – Agosto 2019</span></div>
  <ul>
    <li>Planificación y control operativo de visitas técnicas de evaluación a establecimientos educacionales a nivel nacional.</li>
    <li>Coordinación logística y seguimiento de indicadores de gestión operativa.</li>
  </ul>
</div>
<div class="job">
  <div class="job-header"><span class="job-title">Encargado de Operaciones / Planificación y Control de Gestión</span> · <span class="job-company">Servicio de Registro Civil e Identificación</span><br><span class="job-date">Abril 2016 – Junio 2018</span></div>
  <ul>
    <li>Optimicé el seguimiento de 12 metas institucionales (CMI, ADP, PMG), alcanzando un cumplimiento del 94% en el ejercicio 2017, 8 puntos porcentuales sobre el año anterior.</li>
    <li>Gestioné una cartera de 2 proyectos en BIP y Chile Indica, con presupuesto combinado superior a 300 millones de CLP (~300 mil €), asegurando el reporte oportuno al Ministerio de Hacienda.</li>
    <li>Supervisión operativa de oficinas regionales y capacitación en procesos y normativas institucionales.</li>
  </ul>
</div>
<div class="job">
  <div class="job-header"><span class="job-title">Analista de Control de Gestión y Procesos</span> · <span class="job-company">SVS / Univ. de Viña del Mar / Cepech</span><br><span class="job-date">Mayo 2012 – Febrero 2015</span></div>
  <ul>
    <li>Estandarización de información para control presupuestario y gestión de licitaciones públicas en 3 organizaciones.</li>
    <li>Elaboración de mapas estratégicos e informes de gestión para alta dirección.</li>
    <li>Gestión de matrices de riesgo y mejora de plataformas digitales de atención ciudadana.</li>
  </ul>
</div>
<h2>Formación</h2>
<div class="edu"><strong>Máster en Inteligencia Artificial para los Negocios</strong> — EAE Business School, Barcelona (2025–2026, completado)</div>
<div class="edu"><strong>Ingeniero en Información y Control de Gestión</strong> — Universidad de Chile, Facultad de Economía y Negocios.</div>
<p><strong>Otros cursos:</strong> Analista Data Science con Python (354 h) · Desarrollador Full Stack JavaScript (440 h) · Preparación y Evaluación Social de Proyectos (80 h).</p>
<h2>Competencias clave</h2>
<p><strong>Gestión de Proyectos TI:</strong> Dirección de licitaciones públicas (ChileCompra / BID), gestión de contratos con proveedores TI, planificación de cartera, CMI, PMBOK, Agile.</p>
<p><strong>Sector público:</strong> Más de 10 años en administración pública. Gestión presupuestaria, indicadores ADP/PMG, política de IA, digitalización de servicios.</p>
<p><strong>Data Science &amp; IA:</strong> Python (Pandas, Scikit-learn, TensorFlow), Machine Learning, análisis de datos, automatización, KPIs.</p>
<p><strong>Desarrollo:</strong> JavaScript · Node.js · React · SQL · REST APIs · HTML/CSS.</p>
<p><strong>Idiomas:</strong> Español (nativo) · Inglés (intermedio).</p>
""")

CA = page("ca-ES", "Sergio Herrera Toloza — Cap de Projecte TI", """
<h1>SERGIO HERRERA TOLOZA</h1>
<p class="role">Cap de Projecte TI · Gestió Pública · Data Science i IA</p>
<p class="contact">Barcelona, Espanya | sherrera@fen.uchile.cl | linkedin.com/in/sergio-herrera-toloza</p>
<h2>Perfil professional</h2>
<p class="summary">Cap de Projecte amb més de 10 anys liderant iniciatives TI i de transformació digital a l'administració pública i privada xilena, incloent-hi 6 anys en càrrecs de direcció. Vaig dirigir la licitació de més de 8 M€ per a la Borsa Nacional d'Ocupació (BNE) 2025–2029 i vaig participar en l'actualització de la Política Nacional d'IA de Xile. Màster en Intel·ligència Artificial per als Negocis (EAE, Barcelona).</p>
<h2>Experiència professional</h2>
<div class="job">
  <div class="job-header"><span class="job-title">Cap de Departament – BNE</span> · <span class="job-company">Sotssecretaria del Treball, Govern de Xile</span><br><span class="job-date">Maig 2022 – Desembre 2025</span></div>
  <p class="context">Direcció del Departament de la Borsa Nacional d'Ocupació (BNE), plataforma pública nacional d'intermediació laboral de Xile.</p>
  <ul>
    <li>Vaig liderar una licitació pública de més de 8 M€ per a la plataforma BNE 2025–2029, adjudicant el contracte dins de termini i garantint la continuïtat operativa d'un portal amb més de 500.000 usuaris actius anuals.</li>
    <li>Vaig reduir el time-to-market dels nous desenvolupaments al voltant d'un 30%, definint línies estratègiques i plans d'acció trimestrals alineats amb 4 objectius ministerials clau.</li>
    <li>Coordinació tècnica en l'actualització de la Política Nacional d'Intel·ligència Artificial de Xile.</li>
    <li>Gestió de processos de licitació pública garantint la continuïtat operativa de serveis digitals crítics.</li>
  </ul>
</div>
<div class="job">
  <div class="job-header"><span class="job-title">Encarregat de Processos i Convenis</span> · <span class="job-company">Col·legi de Metges de Xile A.G.</span><br><span class="job-date">Setembre 2019 – Gener 2022</span></div>
  <ul>
    <li>Vaig escalar la transformació digital implementant la signatura electrònica i el pagament en línia, reduint un 40% els tràmits presencials i estandarditzant més de 15 processos institucionals.</li>
    <li>Vaig dissenyar i tancar 6 convenis estratègics amb aliats externs, incrementant un 25% la base de serveis disponibles per a més de 18.000 col·legiats.</li>
    <li>Coordinació de projectes de transformació digital amb proveïdors i equips interns.</li>
  </ul>
</div>
<div class="job">
  <div class="job-header"><span class="job-title">Enginyer de Planificació</span> · <span class="job-company">Agència de Qualitat de l'Educació</span><br><span class="job-date">Febrer 2019 – Agost 2019</span></div>
  <ul>
    <li>Planificació i control operatiu de visites tècniques d'avaluació a centres educatius d'àmbit nacional.</li>
    <li>Coordinació logística i seguiment d'indicadors de gestió operativa.</li>
  </ul>
</div>
<div class="job">
  <div class="job-header"><span class="job-title">Encarregat d'Operacions / Planificació i Control de Gestió</span> · <span class="job-company">Servei de Registre Civil i Identificació</span><br><span class="job-date">Abril 2016 – Juny 2018</span></div>
  <ul>
    <li>Vaig optimitzar el seguiment de 12 objectius institucionals (CMI, ADP, PMG), assolint un compliment del 94% l'exercici 2017, 8 punts percentuals per sobre de l'any anterior.</li>
    <li>Vaig gestionar una cartera de 2 projectes a BIP i Chile Indica, amb un pressupost combinat superior a 300 milions de CLP, assegurant el report puntual al Ministeri d'Hisenda.</li>
    <li>Supervisió operativa d'oficines regionals i formació en processos i normatives institucionals.</li>
  </ul>
</div>
<div class="job">
  <div class="job-header"><span class="job-title">Analista de Control de Gestió i Processos</span> · <span class="job-company">SVS / Univ. de Viña del Mar / Cepech</span><br><span class="job-date">Maig 2012 – Febrer 2015</span></div>
  <ul>
    <li>Estandardització de la informació per al control pressupostari i la gestió de licitacions públiques en 3 organitzacions.</li>
    <li>Elaboració de mapes estratègics i informes de gestió per a l'alta direcció.</li>
    <li>Gestió de matrius de risc i millora de plataformes digitals d'atenció ciutadana.</li>
  </ul>
</div>
<h2>Formació acadèmica</h2>
<div class="edu"><strong>Màster en Intel·ligència Artificial per als Negocis</strong> — EAE Business School, Barcelona (2025–2026)</div>
<div class="edu"><strong>Enginyer en Informació i Control de Gestió</strong> — Universitat de Xile, Facultat d'Economia i Negocis</div>
<p><strong>Altres cursos:</strong> Analista de Data Science amb Python (354 h) · Desenvolupador Full Stack JavaScript (440 h) · Preparació i Avaluació Social de Projectes (80 h).</p>
<h2>Competències clau</h2>
<p><strong>Gestió de Projectes TI:</strong> Direcció de licitacions públiques (ChileCompra/BID), gestió de contractes amb proveïdors TI, planificació de cartera, Quadre de Comandament Integral (CMI), PMBOK, Agile.</p>
<p><strong>Sector públic:</strong> Més de 10 anys a l'administració pública. Gestió pressupostària, licitacions, indicadors ADP/PMG, política d'IA, digitalització de serveis.</p>
<p><strong>Data Science i IA:</strong> Python (Pandas, Scikit-learn, TensorFlow), Machine Learning, anàlisi de dades, automatització.</p>
<p><strong>Desenvolupament:</strong> JavaScript · Node.js · React · SQL · REST APIs · HTML/CSS.</p>
<p><strong>Idiomes:</strong> Castellà (nadiu) · Anglès (intermedi).</p>
""")

EN = page("en-GB", "Sergio Herrera Toloza — IT Project Manager", """
<h1>SERGIO HERRERA TOLOZA</h1>
<p class="role">IT Project Manager · Public Sector · Data Science &amp; AI</p>
<p class="contact">Barcelona, Spain | sherrera@fen.uchile.cl | linkedin.com/in/sergio-herrera-toloza</p>
<h2>Professional summary</h2>
<p class="summary">IT Project Manager with over 10 years leading IT and digital transformation initiatives across Chile's public and private sectors, including 6 years in management roles. Led the €8M+ public tender for Chile's National Employment Exchange (BNE) 2025–2029 and contributed to the update of Chile's National AI Policy. Master's in Artificial Intelligence for Business, combining senior strategic management with hands-on technical capability in Data Science and AI.</p>
<h2>Professional experience</h2>
<div class="job">
  <div class="job-header"><span class="job-title">Head of Department – BNE</span> · <span class="job-company">Undersecretariat of Labour, Government of Chile</span><br><span class="job-date">May 2022 – December 2025</span></div>
  <p class="context">Led the department running the National Employment Exchange (BNE), Chile's public national job-matching platform.</p>
  <ul>
    <li>Led a €8M+ public tender for the BNE platform 2025–2029, awarding the contract on schedule and safeguarding operational continuity for a portal with 500,000+ annual active users.</li>
    <li>Cut time-to-market for new releases by approximately 30% by setting strategic guidelines and quarterly action plans aligned with 4 key ministerial objectives.</li>
    <li>Provided technical coordination for the update of Chile's National Artificial Intelligence Policy.</li>
    <li>Managed public procurement processes ensuring operational continuity of critical digital services.</li>
  </ul>
</div>
<div class="job">
  <div class="job-header"><span class="job-title">Process and Partnerships Manager</span> · <span class="job-company">Chilean Medical Association (Colegio Médico de Chile A.G.)</span><br><span class="job-date">September 2019 – January 2022</span></div>
  <ul>
    <li>Scaled digital transformation by implementing electronic signature and online payment, reducing in-person procedures by 40% and standardising 15+ institutional processes.</li>
    <li>Designed and closed 6 strategic partnership agreements with external allies, expanding the service base by 25% for 18,000+ members.</li>
    <li>Coordinated digital transformation projects with vendors and internal teams.</li>
  </ul>
</div>
<div class="job">
  <div class="job-header"><span class="job-title">Planning Engineer</span> · <span class="job-company">Education Quality Agency</span><br><span class="job-date">February 2019 – August 2019</span></div>
  <ul>
    <li>Planned and operationally controlled nationwide technical evaluation visits to schools.</li>
    <li>Handled logistics coordination and monitoring of operational performance indicators.</li>
  </ul>
</div>
<div class="job">
  <div class="job-header"><span class="job-title">Operations Manager / Planning and Performance Management</span> · <span class="job-company">Civil Registry and Identification Service</span><br><span class="job-date">April 2016 – June 2018</span></div>
  <ul>
    <li>Improved tracking of 12 institutional targets (Balanced Scorecard, senior public management and performance improvement programmes), reaching 94% compliance in 2017, 8 percentage points above the previous year.</li>
    <li>Managed a 2-project portfolio in the national public investment systems (BIP and Chile Indica) with a combined budget above CLP 300M, ensuring timely reporting to the Ministry of Finance.</li>
    <li>Supervised regional offices and delivered training on institutional processes and regulations.</li>
  </ul>
</div>
<div class="job">
  <div class="job-header"><span class="job-title">Performance Management and Process Analyst</span> · <span class="job-company">Financial Market Regulator (SVS) / Univ. de Viña del Mar / Cepech</span><br><span class="job-date">May 2012 – February 2015</span></div>
  <ul>
    <li>Standardised information sources for budget control and public procurement across 3 organisations.</li>
    <li>Produced strategy maps and management reports for senior leadership.</li>
    <li>Managed risk matrices and improved digital citizen-service platforms.</li>
  </ul>
</div>
<h2>Education</h2>
<div class="edu"><strong>Master's in Artificial Intelligence for Business</strong> — EAE Business School, Barcelona (2025–2026)</div>
<div class="edu"><strong>Engineer in Information and Management Control</strong> — Universidad de Chile, School of Economics and Business. Five-year professional degree; equivalent to Bachelor's + Master's in the European system, subject to formal recognition.</div>
<p><strong>Additional training:</strong> Data Science Analyst with Python (354 hours) · Full Stack JavaScript Developer (440 hours) · Social Appraisal and Evaluation of Public Projects (80 hours).</p>
<h2>Core competencies</h2>
<p><strong>IT Project Management:</strong> Public tender leadership (ChileCompra / IDB frameworks), IT vendor and contract management, project portfolio planning, Balanced Scorecard, PMBOK, Agile.</p>
<p><strong>Public sector:</strong> 10+ years in public administration. Budget management, procurement, institutional performance indicators, AI policy, service digitalisation.</p>
<p><strong>Data Science &amp; AI:</strong> Python (Pandas, Scikit-learn, TensorFlow), Machine Learning, data analysis, process automation.</p>
<p><strong>Development:</strong> JavaScript · Node.js · React · SQL · REST APIs · HTML/CSS.</p>
<p><strong>Languages:</strong> Spanish (native) · English (intermediate).</p>
""")

FILES = {
    "Sergio_Herrera_CV_JefeProyectoTI_ES_Barcelona.html": ES_BCN,
    "Sergio_Herrera_CV_JefeProyectoTI_ES_Santiago.html": ES_SCL,
    "Sergio_Herrera_CV_JefeProyectoTI_CA_Barcelona.html": CA,
    "Sergio_Herrera_CV_JefeProyectoTI_EN.html": EN,
}


def find_browser():
    candidates = [
        Path(r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"),
        Path(r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"),
        Path(r"C:\Program Files\Google\Chrome\Application\chrome.exe"),
        Path(r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"),
    ]
    for c in candidates:
        if c.exists():
            return c
    return None


def main() -> int:
    html_paths = []
    for name, html in FILES.items():
        path = OUT / name
        path.write_text(html, encoding="utf-8")
        html_paths.append(path)
        print("wrote", path.name)

    browser = find_browser()
    if not browser:
        print("No browser found for PDF export")
        return 1

    for html_path in html_paths:
        pdf_path = html_path.with_suffix(".pdf")
        uri = html_path.resolve().as_uri()
        cmd = [
            str(browser),
            "--headless=new",
            "--disable-gpu",
            "--no-pdf-header-footer",
            f"--print-to-pdf={pdf_path}",
            uri,
        ]
        print("pdf", pdf_path.name)
        subprocess.run(cmd, check=False)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
