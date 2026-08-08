export function formatRupiah(price){
    return new Intl.NumberFormat("id-ID").format(price)
}
