'use client'
import { useState, useRef, useEffect } from 'react'

const SA_LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇿🇦', native: 'English' },
  { code: 'zu', name: 'isiZulu', flag: '🇿🇦', native: 'isiZulu' },
  { code: 'xh', name: 'isiXhosa', flag: '🇿🇦', native: 'isiXhosa' },
  { code: 'af', name: 'Afrikaans', flag: '🇿🇦', native: 'Afrikaans' },
  { code: 'st', name: 'Sesotho', flag: '🇿🇦', native: 'Sesotho' },
  { code: 'tn', name: 'Setswana', flag: '🇿🇦', native: 'Setswana' },
  { code: 'ts', name: 'Xitsonga', flag: '🇿🇦', native: 'Xitsonga' },
  { code: 'ss', name: 'siSwati', flag: '🇿🇦', native: 'siSwati' },
  { code: 've', name: 'Tshivenda', flag: '🇿🇦', native: 'Tshivenḓa' },
  { code: 'nr', name: 'isiNdebele', flag: '🇿🇦', native: 'isiNdebele' },
  { code: 'nso', name: 'Sepedi', flag: '🇿🇦', native: 'Sepedi' },
]

// Key UI phrases translated into all 11 SA official languages
const TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    welcome: 'Welcome back',
    tagline: 'Continue your inner work',
    book: 'Book a session',
    journal: 'Write in journal',
    tasks: 'My Tasks',
    exercises: 'Home Exercises',
    assessment: 'Assessment',
    closure: 'Closure Letters',
    couples: 'Couples Space',
    affirmation_title: "Today's affirmation",
    prompt_title: "Today's reflection prompt",
    mood_question: 'How are you feeling right now?',
    mood_sub: 'A quick emotional check-in — no right answers.',
    healing_toolkit: 'Your healing toolkit',
    sign_in: 'Sign in',
    get_started: 'Get started',
    demo_access: 'Demo access',
    our_services: 'Our services',
    about_us: 'About us',
    contact: 'Get in touch',
  },
  zu: {
    welcome: 'Wamukelekile futhi',
    tagline: 'Qhubeka umsebenzi wakho wangaphakathi',
    book: 'Bhuka iseshini',
    journal: 'Bhala ejenalini',
    tasks: 'Imisebenzi Yami',
    exercises: 'Imisebenzi Yasekhaya',
    assessment: 'Ukuhlolwa',
    closure: 'Izincwadi Zokuphela',
    couples: 'Indawo Yabashadile',
    affirmation_title: 'Ukuqinisekisa kwannamuhla',
    prompt_title: 'Umbuzo wokucabanga wanamuhla',
    mood_question: 'Uzizwa kanjani manje?',
    mood_sub: 'Ukuhlolwa kwemizwa ngokushesha — azikho izimpendulo ezilungile.',
    healing_toolkit: 'Izinsiza zakho zokuphulukiswa',
    sign_in: 'Ngena',
    get_started: 'Qala',
    demo_access: 'Ukufinyelela kwedemo',
    our_services: 'Izinsizakalo zethu',
    about_us: 'Mayelana nathi',
    contact: 'Xhumana nathi',
  },
  xh: {
    welcome: 'Wamkelekile',
    tagline: 'Qhubeka nomsebenzi wakho wangaphakathi',
    book: 'Bhukhela iseshini',
    journal: 'Bhala kwijeni',
    tasks: 'Imisebenzi Yam',
    exercises: 'Imisebenzi Yasekhaya',
    assessment: 'Uvavanyo',
    closure: 'Iincwadi Zokuvalwa',
    couples: 'Indawo Yababhinqileyo',
    affirmation_title: 'Ukuqinisekisa kwanamhla',
    prompt_title: 'Umbuzo wokucinga wanamhla',
    mood_question: 'Uziva njani ngoku?',
    mood_sub: 'Ukuhlolwa okukhakazo kwemvakalelo — akukho mpendulo ilungileyo.',
    healing_toolkit: 'Izixhobo zakho zokuphilisa',
    sign_in: 'Ngena',
    get_started: 'Qala',
    demo_access: 'Ukufikelela kwedemo',
    our_services: 'Iinkonzo zethu',
    about_us: 'Malunga nathi',
    contact: 'Qhagamshelana nathi',
  },
  af: {
    welcome: 'Welkom terug',
    tagline: 'Gaan voort met jou innerlike werk',
    book: 'Bespreek \'n sessie',
    journal: 'Skryf in joernaal',
    tasks: 'My Take',
    exercises: 'Tuisoefeninge',
    assessment: 'Assessering',
    closure: 'Sluitingsbriewe',
    couples: 'Paarruimte',
    affirmation_title: 'Vandag se bevestiging',
    prompt_title: 'Vandag se refleksievraag',
    mood_question: 'Hoe voel jy nou?',
    mood_sub: '\'n Vinnige emosionele incheck — geen regte antwoorde nie.',
    healing_toolkit: 'Jou genesingsgereedskap',
    sign_in: 'Teken in',
    get_started: 'Begin',
    demo_access: 'Demo-toegang',
    our_services: 'Ons dienste',
    about_us: 'Oor ons',
    contact: 'Kontak ons',
  },
  st: {
    welcome: 'Rea u amohela hape',
    tagline: 'Tswela pele le mosebetsi wa hao wa kahare',
    book: 'Buka seshene',
    journal: 'Ngola jenaleng',
    tasks: 'Mesebetsi ya ka',
    exercises: 'Ditlwaelo tsa Hae',
    assessment: 'Tekolo',
    closure: 'Mangolo a Ketsahalo',
    couples: 'Sebaka sa Baratani',
    affirmation_title: 'Netefatso ya kajeno',
    prompt_title: 'Potso ya ho nahanisisa ya kajeno',
    mood_question: 'O ikutlwa jwang hajwale?',
    mood_sub: 'Tekolo e potlakileng ya maikutlo — ha ho na dikarabo tse nepahetseng.',
    healing_toolkit: 'Didirisiwa tsa hao tsa ho fola',
    sign_in: 'Kena',
    get_started: 'Qala',
    demo_access: 'Phihlelo ya demo',
    our_services: 'Ditshebeletso tsa rona',
    about_us: 'Mabapi le rona',
    contact: 'Ikopanya le rona',
  },
  tn: {
    welcome: 'O amogelwa gape',
    tagline: 'Tswelela le tiro ya gago ya mo teng',
    book: 'Buka sešene',
    journal: 'Kwala mo jenalong',
    tasks: 'Ditiro tsa me',
    exercises: 'Ditlhabololo tsa Gae',
    assessment: 'Tekolo',
    closure: 'Dikwalo tsa Bofelo',
    couples: 'Sebaka sa Bagadikane',
    affirmation_title: 'Netefatso ya letsatsi leno',
    prompt_title: 'Potso ya go nahanisisa ya letsatsi leno',
    mood_question: 'O ikutlwa jang jaanong?',
    mood_sub: 'Tekolo e potlako ya maikutlo — ga go na dikarabo tse di siameng.',
    healing_toolkit: 'Didirisiwa tsa gago tsa go fola',
    sign_in: 'Tsena',
    get_started: 'Simolola',
    demo_access: 'Phitlhelelo ya demo',
    our_services: 'Ditirelo tsa rona',
    about_us: 'Ka ga rona',
    contact: 'Ikopanye le rona',
  },
  ts: {
    welcome: 'Wa amukeriwa nakambe',
    tagline: 'Yingisa ntirho wa wena wa endlelo',
    book: 'Bhukhisa seshene',
    journal: 'Tsala eka jenali',
    tasks: 'Mintirho ya Mina',
    exercises: 'Mintlharihelo ya Kaya',
    assessment: 'Xivekelo',
    closure: 'Swileta swa Ku Pfala',
    couples: 'Ndhawu ya Loversu',
    affirmation_title: 'Ku tiyisela ka namuntlha',
    prompt_title: 'Swivutiso swa ku ehleketa swa namuntlha',
    mood_question: 'U tiva njani sweswi?',
    mood_sub: 'Ku hlola swilaveko swa miehleketo — a ku na swivutiso leswi lulameke.',
    healing_toolkit: 'Switirhelwa swa wena swa ku folisa',
    sign_in: 'Nghena',
    get_started: 'Sungula',
    demo_access: 'Ku fikelela ka demo',
    our_services: 'Swirho swa hina',
    about_us: 'Hi hina',
    contact: 'Khalayi na hina',
  },
  ss: {
    welcome: 'Wamukelwa futsi',
    tagline: 'Chubeka nemsebenzi wakho wangekhatsi',
    book: 'Bhukha seshini',
    journal: 'Bhala ejenalini',
    tasks: 'Imisebenti Yami',
    exercises: 'Imisebenti Yekhaya',
    assessment: 'Kuhlolwa',
    closure: 'Tincwadzi Tekuvala',
    couples: 'Indzawo Yetijoli',
    affirmation_title: 'Kucinisekisa kwalamuhla',
    prompt_title: 'Umbuzo wetinatfo walamuhla',
    mood_question: 'Uzizwa njani nyalo?',
    mood_sub: 'Kuhlolwa kwemizwa ngokushesha — akukho tiphendvulo letilungile.',
    healing_toolkit: 'Tichwebo takho tekuphilisa',
    sign_in: 'Ngena',
    get_started: 'Cala',
    demo_access: 'Kufinyelela kwe demo',
    our_services: 'Tisebenti tetfu',
    about_us: 'Mayelana natsi',
    contact: 'Sithinte',
  },
  ve: {
    welcome: 'Ndi a u amukela hafhu',
    tagline: 'Bvela phanḓa na mushumo waṋu wa ngomu',
    book: 'Buka seshene',
    journal: 'Ṅwala jenaleni',
    tasks: 'Mishumo Yanga',
    exercises: 'Maitele a Hayini',
    assessment: 'Tsedzuluso',
    closure: 'Tshumelo dza Vhalalelwa',
    couples: 'Nḓowelo ya Vhafumi',
    affirmation_title: 'Khwiniso ya ḽaḽa',
    prompt_title: 'Mbudziso ya ṱhalutshedzo ya ḽaḽa',
    mood_question: 'Ni ṱoḓa mini zwino?',
    mood_sub: 'Tsedzuluso ya u sedza mbilaelo — a hu na mhindulo dzi re nḓowelo.',
    healing_toolkit: 'Zwiitisi zwaṋu zwa u fhola',
    sign_in: 'Dzhena',
    get_started: 'Thoma',
    demo_access: 'U wanala ha demo',
    our_services: 'Tshumelo dzashu',
    about_us: 'Maiphato ashu',
    contact: 'Amba na riṅwe',
  },
  nr: {
    welcome: 'Wamukelekileko',
    tagline: 'Qhubeka nomsebenzi wakho wangaphakathi',
    book: 'Bhukha isithangami',
    journal: 'Bhala ejenalini',
    tasks: 'Imisebenzi Yami',
    exercises: 'Imisebenzi Yasekhaya',
    assessment: 'Ukuhlolwa',
    closure: 'Izincwadi Zokuvalwa',
    couples: 'Indawo Yabaganwa',
    affirmation_title: 'Ukuqinisekisa kwanamhlanje',
    prompt_title: 'Umbuzo wokucabanga wanamhlanje',
    mood_question: 'Uzizwa njani nje?',
    mood_sub: 'Ukuhlolwa kwemizwa ngokushesha — azikho izimpendulo ezilungile.',
    healing_toolkit: 'Izinsiza zakho zokuphulukiswa',
    sign_in: 'Ngena',
    get_started: 'Qala',
    demo_access: 'Ukufinyelela kwedemo',
    our_services: 'Amasevisi ethu',
    about_us: 'Mayelana nathi',
    contact: 'Xhumana nathi',
  },
  nso: {
    welcome: 'O amogelwa gape',
    tagline: 'Tšwela pele le mošomo wa gago wa ka gare',
    book: 'Buka sešene',
    journal: 'Ngwala jenaleng',
    tasks: 'Mešomo ya Ka',
    exercises: 'Ditlwaelo tša Gae',
    assessment: 'Tekolo',
    closure: 'Dikwalwa tša Go Felela',
    couples: 'Sebaka sa Baratwi',
    affirmation_title: 'Netefatšo ya lehono',
    prompt_title: 'Potšišo ya go nagana ya lehono',
    mood_question: 'O ikwa bjang bjale?',
    mood_sub: 'Tekolo ye potlakago ya maikutlo — ga go na dikarabo tše di lokago.',
    healing_toolkit: 'Didirišwa tša gago tša go fola',
    sign_in: 'Tsena',
    get_started: 'Thoma',
    demo_access: 'Phihlelelo ya demo',
    our_services: 'Ditirelo tša rena',
    about_us: 'Ka ga rena',
    contact: 'Ikopanye le rena',
  },
}

export function useTranslation() {
  const [lang, setLang] = useState('en')
  const t = (key: string): string => {
    return TRANSLATIONS[lang]?.[key] || TRANSLATIONS['en']?.[key] || key
  }
  return { lang, setLang, t, languages: SA_LANGUAGES }
}

export function LanguageSelector({ lang, setLang }: { lang: string; setLang: (l: string) => void }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const current = SA_LANGUAGES.find(l => l.code === lang) || SA_LANGUAGES[0]

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 12px', borderRadius: '50px', border: '1.5px solid #e8e4dc', background: 'white', cursor: 'pointer', fontFamily: 'Jost, sans-serif', fontSize: '13px', fontWeight: 500, color: '#3d3d3a', transition: 'all 0.15s', whiteSpace: 'nowrap' }}
        title="Select language / Khetha ulimi"
      >
        <span style={{ fontSize: '16px' }}>🇿🇦</span>
        <span>{current.native}</span>
        <span style={{ fontSize: '10px', color: '#afa99a', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s', display: 'inline-block' }}>▼</span>
      </button>

      {open && (
        <div style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, background: 'white', border: '1px solid #e8e4dc', borderRadius: '16px', boxShadow: '0 12px 40px rgba(10,42,30,0.15)', zIndex: 200, minWidth: '180px', overflow: 'hidden', animation: 'fadeIn 0.15s ease' }}>
          <div style={{ padding: '8px' }}>
            <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '10px', fontWeight: 700, color: '#afa99a', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '6px 10px 4px' }}>
              🇿🇦 11 Official Languages
            </p>
            {SA_LANGUAGES.map(language => (
              <button
                key={language.code}
                onClick={() => { setLang(language.code); setOpen(false) }}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '9px 12px', border: 'none', background: lang === language.code ? '#f0f7f4' : 'transparent', cursor: 'pointer', fontFamily: 'Jost, sans-serif', fontSize: '13px', fontWeight: lang === language.code ? 600 : 400, color: lang === language.code ? '#186b52' : '#3d3d3a', borderRadius: '10px', transition: 'all 0.1s', textAlign: 'left' }}
              >
                <span>{language.flag}</span>
                <div>
                  <span style={{ display: 'block' }}>{language.native}</span>
                  {language.name !== language.native && (
                    <span style={{ fontSize: '11px', color: '#afa99a', display: 'block' }}>{language.name}</span>
                  )}
                </div>
                {lang === language.code && <span style={{ marginLeft: 'auto', color: '#1D9E75' }}>✓</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
