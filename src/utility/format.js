const bulanFullName = value => {
    switch (value) {
        case '01' : 
            return 'Januari'
        case '02' : 
            return 'Februari'
        case '03' : 
            return 'Maret'
        case '04' : 
            return 'April'
        case '05' : 
            return 'Mei'
        case '06' : 
            return 'Juni'
        case '07' : 
            return 'Juli'
        case '08' : 
            return 'Agustus'
        case '09' : 
            return 'September'
        case '10' : 
            return 'Oktober'
        case '11' : 
            return 'November'
        case '12' : 
            return 'Desember' 
        default :
            return ''
    }
  }

const emailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const formatTanggalWaktu = value => {
    const TanggalSplit = []
    value.split(' ').map((itemTanggalWaktu, i) => {
      return TanggalSplit.push({id: i, item: itemTanggalWaktu})
    })
    const Tahun = TanggalSplit[0].item.substr(0, 4)
    const Bulan = bulanFullName(TanggalSplit[0].item.substr(5, 2))
    const Tanggal = TanggalSplit[0].item.substr(8, 2)
    const Waktu = TanggalSplit[1].item.substr(0, 5)

    if (Tahun < 1901) {
        return '-'
    } else {
        return `${Tanggal} ${Bulan} ${Tahun}, ${Waktu}`
    }
    
  }

export const mailFormat = value => {
    if (!value.match(emailFormat)) {
        return false
    } else {
        return true
    }
}

export const urlFormat = value => {
    if (value.indexOf('http') !== -1) {
        return true
    } else {
        return false
    }
}