const fetch = require('../odd_files/createRequets'),
      curSettings = { baseUrl: 'https://disease.sh' },
      fetchJson = (path) => fetch(`${curSettings.baseUrl}/${path}`).json(),
      yesterday = {}, twoDaysAgo = {}, jhucsse = {}, historical = {}, nyt = {}, apple = {}

const createPath = (opts, path) => {
  if(opts.sort || String(opts.strict) !== 'undefined' || opts.yesterday || String(opts.allowNull) !== 'undefined') {
    path += '?'
    if(opts.sort) 
      path += `sort=${opts.sort}`
    if(opts.yesterday)
      path += (opts.sort ?'&':'')+'yesterday='+opts.yesterday
    if(opts.twoDaysAgo)
      path += (opts.sort || opts.yesterday ?'&':'')+'twoDaysAgo='+opts.twoDaysAgo
    if(String(opts.allowNull) !== 'undefined')
      path += (opts.sort || opts.yesterday || opts.twoDaysAgo ?'&':'')+'allowNull='+opts.allowNull
    if(String(opts.strict) !== 'undefined') 
      path += (opts.sort || opts.yesterday || opts.twoDaysAgo || String(opts.allowNull) !== 'undefined' ?'&':'')+'strict='+opts.strict
  }
  return path
}
const _all = (opts) => fetchJson(createPath(opts, `v3/covid-19/all`))


const settings = (opts = {}) => (curSettings.baseUrl = opts.baseUrl)


const all = (opts = {}) => _all({...opts, yesterday: false})


const countries = (opts = {}) => {
  let path = 'v3/covid-19/countries'
  if(opts.country) 
    path += `/${Array.isArray(opts.country) ? (opts.country.join('|')) : opts.country}`
  return fetchJson(createPath(opts, path))
}


const continents = (opts = {}) => {
  let path = 'v3/covid-19/continents'
  if(opts.continent) 
    path += `/${opts.continent}`
  return fetchJson(createPath(opts, path))
}


const states = (opts = {}) => {
  let path = 'v3/covid-19/states'
  if(opts.state) 
    path += `/${Array.isArray(opts.state) ? (opts.state.join('|')) : opts.state}`
  return fetchJson(createPath(opts, path))
}

yesterday.all = (opts = {}) => _all({...opts, yesterday: true})

yesterday.countries = (opts = {}) => countries({...opts, yesterday: true})

yesterday.continents = (opts = {}) => continents({...opts, yesterday: true})

yesterday.states = (opts = {}) => states({...opts, yesterday: true})

twoDaysAgo.all = (opts = {}) => _all({...opts, twoDaysAgo: true})

twoDaysAgo.countries = (opts = {}) => countries({...opts, twoDaysAgo: true})

twoDaysAgo.continents = (opts = {}) => continents({...opts, twoDaysAgo: true})

jhucsse.all = () => fetchJson('v3/covid-19/jhucsse')

jhucsse.counties = (opts = {}) => {
  let path = 'v3/covid-19/jhucsse/counties'
  if(opts.county) 
    path += `/${Array.isArray(opts.county) ? (opts.county.join('|')) : opts.county}`
  return fetchJson(path)
}

historical.all = (opts = {}) => fetchJson(`v3/covid-19/historical/all${opts.days ? `?lastdays=${opts.days}`:''}`)

historical.countries = (opts = {}) => {
  let path = 'v3/covid-19/historical'
  if(opts.country) {
    path += `/${Array.isArray(opts.country) ? (opts.country.join('|')) : opts.country}`
    if(opts.province) 
      path += `/${Array.isArray(opts.province) ? (opts.province.join('|')) : opts.province}`
    if(opts.days) 
      path += `?lastdays=${opts.days}`
  }
  return fetchJson(path)
}

nyt.usa = () => fetchJson('v3/covid-19/nyt/usa')

nyt.states = (opts = {}) => {
  let path = 'v3/covid-19/nyt/states'
  if(opts.state) 
    path += `/${opts.state}`
  return fetchJson(path)
}

nyt.counties = (opts = {}) => {
  let path = 'v3/covid-19/nyt/counties'
  if(opts.county) 
    path += `/${opts.county}`
  return fetchJson(path)
}

apple.countries = () => fetchJson('v3/covid-19/apple/countries')

apple.subregions = (country) => fetchJson(`v3/covid-19/apple/countries/${country}`)

apple.mobilityData = (opts = {}) => {
  let path = 'v3/covid-19/apple/countries'
  if(opts.country) {
    path += `/${opts.country}`
    if(opts.subregion) 
      path += `/${Array.isArray(opts.subregion) ? (opts.subregion.join('|')) : opts.subregion}`
  }
  return fetchJson(path)
}

const gov = (country) => fetchJson(`v3/covid-19/gov/${country ? country : ''}`)

module.exports = {
  settings,
  all,
  countries,
  continents,
  states,
  yesterday,
  twoDaysAgo,
  jhucsse,
  historical,
  nyt,
  apple,
  gov
}