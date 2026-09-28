// State & Storage
let dataSiswa = [];
let editIndex = -1;

// Element References
const form = document.getElementById('ekskulForm');
const namaInput = document.getElementById('nama');
const jurusanSelect = document.getElementById('jurusan');
const ekskulSelect = document.getElementById('ekskul');
const btnSubmit = document.getElementById('btnSubmit');
const tableBody = document.getElementById('tableBody');
const dataCounter = document.getElementById('dataCounter');

// Form Submit Listener (Tambah / Edit)
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const nama = namaInput.value.trim();
  const kelasElement = document.querySelector('input[name="kelas"]:checked');
  const kelas = kelasElement ? kelasElement.value : '';
  const jurusan = jurusanSelect.value;
  const ekskul = ekskulSelect.value;

  if (!nama || !kelas || !jurusan || !ekskul) {
    alert('Mohon lengkapi semua kolom form!');
    return;
  }

  let pesanAlert = '';

  if (editIndex === -1) {
    // Tambah Data Baru
    dataSiswa.push({ nama, kelas, jurusan, ekskul });
    pesanAlert = 'data berhasil ditambah';
  } else {
    // Update Data
    dataSiswa[editIndex] = { nama, kelas, jurusan, ekskul };
    editIndex = -1;
    btnSubmit.textContent = 'Tambah Data';
    pesanAlert = 'data berhasil di edit';
  }

  // 1. Reset Form & Render Tabel ke layar TERLEBIH DAHULU
  form.reset();
  renderTable();

  // 2. Beri jeda 10 milidetik agar browser sempat menggambar tabel, lalu tampilkan Alert
  setTimeout(() => {
    alert(pesanAlert);
  }, 10);
});

// Render Fungsi Tabel
function renderTable() {
  tableBody.innerHTML = '';
  dataCounter.textContent = `${dataSiswa.length} Siswa`;

  if (dataSiswa.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="6" class="empty-state">
          Belum ada data pendaftaran siswa.
        </td>
      </tr>
    `;
    return;
  }

  dataSiswa.forEach((item, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${escapeHtml(item.nama)}</td>
      <td>${item.kelas}</td>
      <td>${item.jurusan}</td>
      <td>${item.ekskul}</td>
      <td>
        <div class="action-cell">
          <button class="btn-action-edit" onclick="editData(${index})">Edit</button>
          <button class="btn-action-delete" onclick="deleteData(${index})">Delete</button>
        </div>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Fungsi Edit Data
function editData(index) {
  const item = dataSiswa[index];
  namaInput.value = item.nama;

  const radioKelas = document.querySelector(`input[name="kelas"][value="${item.kelas}"]`);
  if (radioKelas) radioKelas.checked = true;

  jurusanSelect.value = item.jurusan;
  ekskulSelect.value = item.ekskul;

  editIndex = index;
  btnSubmit.textContent = 'Simpan Edit';

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Fungsi Delete Data
function deleteData(index) {
  dataSiswa.splice(index, 1);

  if (editIndex === index) {
    editIndex = -1;
    btnSubmit.textContent = 'Tambah Data';
    form.reset();
  }

  // Render tabel dulu ke layar
  renderTable();

  // Baru tampilkan alert hapus
  setTimeout(() => {
    alert('data berhasil di hapus');
  }, 10);
}

// Security Escape Function
function escapeHtml(text) {
  const div = document.createElement('div');
  div.innerText = text;
  return div.innerHTML;
}

// Render awal
renderTable();