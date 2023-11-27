module.exports = function (data) {
    if (data.seller.isSellingAHouse === 'Yes') return 'house'
    if (data.seller.isSellingATownhome === 'Yes') return 'townhome'
    if (data.seller.isSellingACondo === 'Yes') return 'condo'
    if (data.seller.isSellingAMultifamily === 'Yes') return 'multifamily'
}