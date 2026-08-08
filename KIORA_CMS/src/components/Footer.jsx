export default function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-8 py-12 grid grid-cols-3 gap-12">
        <div>
          <h2 className="text-2xl font-bold mb-4">KIORA</h2>
          <p className="text-gray-600 leading-7 mb-6">
            KIORA menyediakan berbagai furnitur dan dekorasi rumah dengan desain
            modern, kualitas terbaik, dan harga yang terjangkau untuk semua
            keluarga.
          </p>
          <button className="px-6 py-3 border rounded-full font-semibold hover:bg-black hover:text-white transition">
            Download App
          </button>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Tautan</h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <a href="#">Tentang Kami</a>
            </li>
            <li>
              <a href="#">Hubungi Kami</a>
            </li>
            <li>
              <a href="#">Karier</a>
            </li>
            <li>
              <a href="#">Lokasi Toko</a>
            </li>
            <li>
              <a href="#">FAQ</a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Bantuan</h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <a href="#">Kebijakan Privasi</a>
            </li>
            <li>
              <a href="#">Syarat & Ketentuan</a>
            </li>
            <li>
              <a href="#">Pengembalian Barang</a>
            </li>
            <li>
              <a href="#">Pembayaran</a>
            </li>
            <li>
              <a href="#">Pengiriman</a>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <div className="max-w-7xl mx-auto py-6 px-8 flex justify-between text-sm text-gray-600">
          <p>© 2026 KIORA. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
