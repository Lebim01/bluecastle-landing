import { PayloadRequest } from 'payload'
import slugify from 'slugify'
import fs from 'fs'
import path from 'path'
import os from 'os'

// ------------------- Utilidades -------------------
function s(value: string) {
  return slugify(value, { lower: true, strict: true, trim: true })
}

function randomDateInLast(days = 45): string {
  const now = Date.now()
  const offset = Math.floor(Math.random() * days * 24 * 60 * 60 * 1000)
  const jitter = Math.floor(Math.random() * 8 * 60 * 60 * 1000) // +/- horas
  return new Date(now - offset + jitter).toISOString()
}

function makeExcerpt(title: string): string {
  return `${title}. Resumen de los movimientos clave e implicaciones para los inversionistas.`
}

// RichText (Lexical) simple
function rich(title: string, paragraphs: string[]) {
  return {
    root: {
      type: 'root',
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
      children: [
        {
          type: 'heading',
          tag: 'h2',
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
          children: [
            { type: 'text', text: title, detail: 0, format: 0, mode: 'normal', style: '', version: 1 },
          ],
        },
        ...paragraphs.map((p) => ({
          type: 'paragraph',
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
          children: [
            { type: 'text', text: p, detail: 0, format: 0, mode: 'normal', style: '', version: 1 },
          ],
        })),
      ],
    },
  }
}

async function ensureCategory(req: PayloadRequest, title: string): Promise<number> {
  const slug = s(title)

  const existing = await req.payload.find({
    collection: 'categories',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  if (existing?.docs?.[0]?.id) return existing.docs[0].id

  const created = await req.payload.create({
    collection: 'categories',
    data: { title, slug },
  })
  return created.id

}

async function ensureCategories(req: PayloadRequest, names: string[]): Promise<Record<string, number>> {
  const out: Record<string, number> = {}
  for (const name of names) out[name] = await ensureCategory(req, name)
  return out
}

// ------------------- Datos base -------------------
const CATEGORY_NAMES = [
  'Mercados',
  'Acciones',
  'Divisas',
  'Materias Primas',
  'Criptomonedas',
  'Bancos Centrales',
  'Latinoamérica',
]

const IMAGE_DIR = process.env.SEED_IMAGE_DIR || path.join(process.cwd(), 'seed-media')

const IMAGE_URLS: string[] = [
  'https://images.unsplash.com/photo-1549421263-5ec394a5adf4', // wall street / stocks
  'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a', // dollar
  'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a', // oil
  'https://images.unsplash.com/photo-1559056199-641a0ac8b55e', // gold
  'https://images.unsplash.com/photo-1629873045094-0a5752b6e1a3', // bitcoin
  'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c', // fed / building
  'https://images.unsplash.com/photo-1531874821656-5f2b1f0a9f21', // eurozone
  'https://images.unsplash.com/photo-1518779578993-ec3579fee39f', // tech
  'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e', // pmi
  'https://images.unsplash.com/photo-1554224155-4d24f4d0803b', // bonds
  'https://images.unsplash.com/photo-1581093458791-9d8a2a6ade10', // europe stocks
  'https://images.unsplash.com/photo-1611974789859-f62c2d1d3b5f', // yuan
  'https://images.unsplash.com/photo-1517955471040-0f49d4a4206f', // copper
  'https://images.unsplash.com/photo-1501862700950-18382cd41497', // ecb
  'https://images.unsplash.com/photo-1621768216002-5a67b56443f1', // crypto exchange
  'https://images.unsplash.com/photo-1554224154-22dec7ec8818', // latam stocks
  'https://images.unsplash.com/photo-1484589065579-248aad0d8b13', // oil spread
  'https://images.unsplash.com/photo-1534759846116-5791c74a5a0b', // labor market
  'https://images.unsplash.com/photo-1535320404287-416e4f7f5a6d', // small caps
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0', // latam inflation
]

async function downloadToTemp(url: string, nameHint = 'image'): Promise<string> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`No se pudo descargar imagen: ${url}`)
  const arrayBuffer = await res.arrayBuffer()
  const ext = '.jpg'
  const tmpFile = path.join(os.tmpdir(), `${nameHint}-${Date.now()}${ext}`)
  await fs.promises.writeFile(tmpFile, Buffer.from(arrayBuffer))
  return tmpFile
}


async function ensureMediaFromLocalOrURL(req: PayloadRequest, src: string, alt: string): Promise<number> {
  // Si es ruta relativa y existe en disco, súbela
  const localPath = path.isAbsolute(src) ? src : path.join(IMAGE_DIR, src)
  let filePath: string
  if (fs.existsSync(localPath)) {
    filePath = localPath
  } else if (/^https?:\/\//i.test(src)) {
    filePath = await downloadToTemp(src, s(alt).slice(0, 40))
  } else {
    // Si no existe el archivo y no es URL, usa una URL de fallback
    const fallback = IMAGE_URLS[Math.floor(Math.random() * IMAGE_URLS.length)]
    filePath = await downloadToTemp(fallback, 'fallback')
  }


  const media = await req.payload.create({
    collection: 'media',
    filePath,
    data: { alt },
  })
  return media.id
}

const NEWS: Array<{
  title: string
  categories: string[]
  paragraphs: string[]
  keywords: string
  image: string
}> = [
    {
      title: 'Wall Street cierra mixto mientras los rendimientos de bonos se estabilizan',
      categories: ['Mercados', 'Acciones'],
      paragraphs: [
        'Los principales índices estadounidenses oscilaron a lo largo de la sesión en un contexto de rendimientos del Tesoro sin grandes cambios. Los inversionistas evaluaron la última tanda de datos de actividad y expectativas de inflación.',
        'Sectores defensivos mostraron mejor desempeño relativo, mientras que tecnología tuvo tomas de ganancia selectivas tras recientes máximos.'
      ],
      keywords: 'S&P 500, Nasdaq, Dow Jones, rendimientos, inflación, acciones EEUU',
      image: 'https://mx.advfn-editors.com/wp-content/uploads/2025/05/wall-street-bull.png',
    },
    {
      title: 'El dólar retrocede frente al euro y al yen ante menor aversión al riesgo',
      categories: ['Divisas', 'Mercados'],
      paragraphs: [
        'El índice dólar cedió terreno conforme mejoró el apetito por riesgo global. Operadores ajustaron posiciones antes de nuevos datos macro en EEUU y Europa.',
        'El EUR/USD rebotó desde soportes técnicos clave, mientras que el USD/JPY moderó avances en medio de vigilancia de posibles intervenciones.'
      ],
      keywords: 'dólar, euro, yen, EUR/USD, USD/JPY, divisas, apetito por riesgo',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnCLZda5Qyyl09JolLkk9MQttN0OBuml4uiA&s',
    },
    {
      title: 'Petróleo WTI supera resistencias ante expectativa de oferta ajustada',
      categories: ['Materias Primas', 'Mercados'],
      paragraphs: [
        'Los futuros del WTI extendieron ganancias respaldados por señales de inventarios menores y recortes de producción en países clave.',
        'Analistas señalaron que una demanda resiliente y riesgos geopolíticos podrían sostener precios en el corto plazo.'
      ],
      keywords: 'petróleo, WTI, Brent, inventarios, OPEP, oferta, demanda',
      image: 'https://responsive.fxempire.com/v7/_fxempire_/2025/09/Oil8.jpg?func=crop&q=70&width=660&force_format=webp'
    },
    {
      title: 'Oro retrocede por repunte en rendimientos, pero mantiene soporte técnico',
      categories: ['Materias Primas', 'Mercados'],
      paragraphs: [
        'El oro spot cedió parte de las alzas recientes ante un modesto repunte de los rendimientos reales. No obstante, los flujos de cobertura sostienen niveles de soporte.',
        'Operadores monitorean declaraciones de bancos centrales y datos de inflación para calibrar la trayectoria del metal precioso.'
      ],
      keywords: 'oro, metales preciosos, rendimientos reales, inflación, refugio',
      image: 'https://s.yimg.com/ny/api/res/1.2/0XgOxRpUl3ysevGZnChLgQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyNDI7aD02OTk7Y2Y9d2VicA--/https://media.zenfs.com/es/el_economista_434/f066976d3f9622b82030429075aaee5e'
    },
    {
      title: 'Bitcoin consolida tras alta volatilidad semanal; altcoins muestran rezago',
      categories: ['Criptomonedas', 'Mercados'],
      paragraphs: [
        'El precio de Bitcoin permaneció en rango estrecho luego de una semana marcada por movimientos bruscos y liquidaciones apalancadas.',
        'Las altcoins exhibieron menor desempeño relativo, en línea con una preferencia por activos de mayor capitalización.'
      ],
      keywords: 'Bitcoin, criptomonedas, altcoins, volatilidad, liquidez',
      image: 'https://s.yimg.com/ny/api/res/1.2/89fVy.a9AmFerPcIWFmgyQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTQyNw--/https://media.zenfs.com/es/benzinga_espana_latam_149/b706ad5db17dfa226c31ffaa4accc9c8'
    },
    {
      title: 'La Fed mantiene el enfoque en datos: mercados descuentan pausas prolongadas',
      categories: ['Bancos Centrales', 'Mercados'],
      paragraphs: [
        'Declaraciones recientes de miembros de la Reserva Federal reforzaron la idea de que la política se mantendrá dependiente de los datos.',
        'Los futuros de fondos federales reflejan probabilidades crecientes de estabilidad en tasas por varios meses.'
      ],
      keywords: 'Reserva Federal, tasas de interés, política monetaria, futuros',
      image: 'https://caretas.pe/wp-content/uploads/2025/01/El-poder-de-la-reserva-federal-FED.jpg'
    },
    {
      title: 'IPC de la zona euro sorprende a la baja y fortalece expectativas de recortes',
      categories: ['Bancos Centrales', 'Mercados'],
      paragraphs: [
        'La lectura de inflación de la eurozona mostró moderación en componentes subyacentes, lo que reavivó apuestas de recortes graduales por parte del BCE.',
        'Bonos soberanos europeos reaccionaron con caídas de rendimiento y repunte de precios.'
      ],
      keywords: 'BCE, inflación, eurozona, IPC, bonos, recortes',
      image: 'https://imagenes.elpais.com/resizer/v2/PVEFLHBGAZDXFCLKBA2CGOGUPI.png?auth=cb9abc5ffd0ffe017f56d50a68e101af576c6b7d6e952a06205a427ae510b140&width=1960&height=1470&smart=true'
    },
    {
      title: 'Temporada de resultados: tecnológicas lideran sorpresas al alza',
      categories: ['Acciones', 'Mercados'],
      paragraphs: [
        'Varios nombres del sector tecnológico superaron expectativas de ingresos y márgenes, apoyando la narrativa de crecimiento en nube e IA.',
        'No obstante, la guía para próximos trimestres se mantuvo prudente por el entorno macro y el gasto corporativo.'
      ],
      keywords: 'resultados, tecnológicas, márgenes, guía, nube, IA',
      image: 'https://imagenes.eleconomista.com.mx/files/og_thumbnail/uploads/2025/02/03/67a13d2d02e0a.png'
    },
    {
      title: 'Peso mexicano gana terreno ante flujo hacia emergentes; Banxico en la mira',
      categories: ['Divisas', 'Latinoamérica'],
      paragraphs: [
        'El MXN registró avances frente al USD en un contexto de mayor apetito por riesgo y diferenciales de tasa favorables.',
        'El mercado seguirá de cerca señales de Banxico respecto al ciclo de política monetaria.'
      ],
      keywords: 'peso mexicano, MXN, Banxico, emergentes, diferenciales de tasa',
      image: 'https://www.bloomberglinea.com/resizer/SIVS6pPJwFEs7hiwLJQGmAk7br8=/arc-photo-bloomberglinea/arc2-prod/public/TI3IU2BUM5DSDMBLEZKTHAKML4.jpg'
    },
    {
      title: 'PMIs globales muestran expansión moderada; industria aún rezagada',
      categories: ['Mercados'],
      paragraphs: [
        'Los índices de gestores de compra (PMI) sugieren expansión moderada en servicios, mientras la manufactura enfrenta vientos en contra.',
        'Empresas reportan presiones de costos contenidas y mejoras graduales en cadenas de suministro.'
      ],
      keywords: 'PMI, manufactura, servicios, costos, cadenas de suministro',
      image: 'https://cloudfront-us-east-1.images.arcpublishing.com/bloomberglinea/HOPOOZUPBJCFNCD5NZD3USCK4I.png'
    },
    {
      title: 'Bonos del Tesoro: curva se empina levemente; emisores corporativos activos',
      categories: ['Mercados'],
      paragraphs: [
        'La pendiente de la curva de rendimientos estadounidenses mostró un leve empinamiento ante expectativas de mayor crecimiento relativo.',
        'La emisión corporativa se mantuvo dinámica aprovechando ventanas de mercado.'
      ],
      keywords: 'bonos del Tesoro, curva, rendimientos, crédito corporativo',
      image: 'https://images.prismic.io/iolwebsite/8564d2a4-815d-44a8-9b01-571117ca228c_RFUSA1.jpg?auto=compress,format&rect=0,0,690,475&w=500&h=344'
    },
    {
      title: 'Bolsas europeas avanzan tras datos de confianza y bajas en energía',
      categories: ['Acciones', 'Mercados'],
      paragraphs: [
        'Los principales índices europeos cerraron al alza impulsados por mejoras en encuestas de confianza y alivio en costos energéticos.',
        'Consumo discrecional y finanzas lideraron las subidas.'
      ],
      keywords: 'Europa, STOXX, confianza, energía, consumo, finanzas',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBHUB-evNt_kUvULdI1sgFBrzisVq8_7k-JA&s'
    },
    {
      title: 'Yuan se estabiliza gracias a señales de soporte oficial y mejores flujos',
      categories: ['Divisas', 'Mercados'],
      paragraphs: [
        'El CNY mostró estabilidad en plazas onshore y offshore luego de fijaciones más fuertes y reportes de apoyo por parte de entidades estatales.',
        'La balanza comercial reciente aportó flujo adicional al tipo de cambio.'
      ],
      keywords: 'yuan, CNY, PBoC, balanza comercial, fixing',
      image: 'https://www.ebc.com/upload/default/20250915/a41e2c03bf55c94063854c52e918a9d6.jpg'
    },
    {
      title: 'Cobre extiende ganancias por expectativas de reactivación y oferta limitada',
      categories: ['Materias Primas', 'Mercados'],
      paragraphs: [
        'El cobre continuó al alza ante expectativas de impulso a la construcción y limitaciones de oferta en minas clave.',
        'Inventarios en bolsas internacionales permanecen en niveles bajos relativos.'
      ],
      keywords: 'cobre, metales industriales, inventarios, demanda',
      image: 'https://media.zenfs.com/es/reuters.com/9f3fca47854e6d268d7c5e2713e0d61c'
    },
    {
      title: 'BCE mantiene tono prudente; mercado evalúa trayectoria de tipos a 12 meses',
      categories: ['Bancos Centrales', 'Mercados'],
      paragraphs: [
        'El Banco Central Europeo reiteró que la evolución de la inflación determinará el ritmo de ajustes, manteniendo la dependencia de datos.',
        'Los swaps de tipos reflejan una senda de recortes gradual.'
      ],
      keywords: 'BCE, tasas, swaps, inflación, recortes',
      image: 'https://s.yimg.com/ny/api/res/1.2/Mk4Pr3JlTf15LMnlEI32Hg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTQyNg--/https://media.zenfs.com/es/reuters.com/311d779f15a1f20f1558c79cbf4c302e'
    },
    {
      title: 'Criptomercado: volúmenes repuntan en exchanges spot; apalancamiento contenido',
      categories: ['Criptomonedas', 'Mercados'],
      paragraphs: [
        'Los volúmenes en mercados spot aumentaron, mientras que el interés abierto en derivados se mantuvo equilibrado.',
        'Analistas señalan mayor participación minorista en sesiones recientes.'
      ],
      keywords: 'cripto, volumen, derivados, interés abierto, exchanges',
      image: 'https://public.bnbstatic.com/image/cms/blog/20210809/5258cecc-80a1-473d-b9fc-24556cd1bf00.png'
    },
    {
      title: 'Bolsas de LatAm mixtas: Brasil y México divergen por factores idiosincráticos',
      categories: ['Latinoamérica', 'Acciones'],
      paragraphs: [
        'El Bovespa avanzó apoyado en nombres de commodities, mientras que el IPC mexicano mostró tomas de utilidad en consumo y telecom.',
        'Flujos extranjeros permanecen selectivos en la región.'
      ],
      keywords: 'LatAm, Bovespa, IPC, flujos, commodities',
      image: 'https://imagenes.eleconomista.com.mx/files/image_1200_600/uploads/2024/09/16/66e8985c8cb72.jpeg'
    },
    {
      title: 'Petróleo: diferencial Brent-WTI se amplía por logística y calidad de crudo',
      categories: ['Materias Primas', 'Mercados'],
      paragraphs: [
        'El spread entre Brent y WTI se amplió levemente debido a dinámicas de transporte y mezclas de calidad.',
        'Refinerías ajustan corridas ante márgenes variables.'
      ],
      keywords: 'Brent, WTI, spread, refinerías, márgenes',
      image: 'https://imagenes.eleconomista.com.mx/files/image_768_448/uploads/2024/12/05/675258ee6a615.jpeg'
    },
    {
      title: 'Mercado laboral en EE. UU.: vacantes moderan, salarios mantienen resiliencia',
      categories: ['Mercados'],
      paragraphs: [
        'Indicadores de empleo apuntan a una desaceleración ordenada en vacantes, con crecimiento salarial aún consistente.',
        'La lectura reduce riesgos de sobrecalentamiento, pero no descarta volatilidad en próximos informes.'
      ],
      keywords: 'empleo, salarios, vacantes, economía EEUU',
      image: 'https://www.lavanguardia.com/files/og_thumbnail/uploads/2022/04/01/62477535333bc.jpeg'
    },
    {
      title: 'Rally en small caps se enfría; analistas recomiendan selectividad sectorial',
      categories: ['Acciones', 'Mercados'],
      paragraphs: [
        'Tras un repunte notable, los índices de baja capitalización perdieron tracción ante mayores costos de financiamiento.',
        'Estrategas sugieren enfoque en balances sólidos y generación de caja.'
      ],
      keywords: 'small caps, financiación, balances, caja libre',
      image: 'https://media-bitfinanzas-com.s3.amazonaws.com/wp-content/uploads/2025/06/smallcaps_rally_final.jpg'
    },
    {
      title: 'Inflación en América Latina continúa descendiendo; bancos centrales calibran pasos',
      categories: ['Latinoamérica', 'Bancos Centrales'],
      paragraphs: [
        'Las lecturas de inflación en varias economías latinoamericanas mostraron descensos graduales, acercándose a rangos objetivos.',
        'Las autoridades monetarias evalúan el espacio para ajustes adicionales sin descuidar expectativas.'
      ],
      keywords: 'inflación, América Latina, política monetaria, objetivos',
      image: 'https://felaban.com/wp-content/uploads/2024/11/image-4.png'
    },
  ]

// ------------------- Seed principal -------------------
export async function seed(req: PayloadRequest) {
  console.log('> Asegurando categorías…')
  const catMap = await ensureCategories(req, CATEGORY_NAMES)

  console.log('> Creando noticias…')
  let created = 0
  for (let i = 0; i < NEWS.length; i++) {
    const n = NEWS[i]
    const title = n.title
    const slug = s(title)
    const excerpt = makeExcerpt(title)

    // Mapear categorías por nombre a IDs
    const categoryIDs = n.categories.map((name) => catMap[name]).filter(Boolean)

    try {
      // 1) Crear o subir media (si falla, no bloquea el post)
      let coverId: number | undefined
      const src = n.image || IMAGE_URLS[i % IMAGE_URLS.length]
      try {
        coverId = await ensureMediaFromLocalOrURL(req, src, title)
      } catch (imgErr) {
        console.warn(' • Sin imagen, usando fallback. Motivo:', (imgErr as any)?.message)
        try {
          const fb = IMAGE_URLS[i % IMAGE_URLS.length]
          coverId = await ensureMediaFromLocalOrURL(req, fb, title)
        } catch {
          // sigue sin cover
        }
      }

      await req.payload.create({
        collection: 'posts',
        data: {
          title,
          slug,
          excerpt,
          richText: rich(title, n.paragraphs) as any,
          categories: categoryIDs,
          publishedAt: randomDateInLast(45),
          status: 'published',
          coverImage: coverId,
          seo: {
            metaTitle: title,
            metaDescription: excerpt,
            keywords: n.keywords,
          },
        },
      })
      created++
      console.log(`  ✔ ${title}`)
    } catch (e: any) {
      console.error(`  ✖ Error creando "${title}":`, e?.message || e)
    }
  }

  console.log(`\nListo. Noticias creadas: ${created}/${NEWS.length}`)
}

