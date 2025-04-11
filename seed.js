const { User } = require('./src/database'); // sesuaikan path-nya

async function seedUsers() {
  await User.sync(); // pastikan tabel sudah dibuat

  await User.bulkCreate([
    {
      email: 'akmal@example.com',
      username: 'akmaldev',
      name: 'Lukmanul Rahman',
      password: 'password123' // sebaiknya di-hash di produksi
    },
    {
      email: 'siti@example.com',
      username: 'siti123',
      name: 'Siti Nurhaliza',
      password: 'rahasia456'
    }
  ]);

  console.log('2 data dummy berhasil ditambahkan!');
}

seedUsers().catch(console.error);
