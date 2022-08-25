<center>

# Arlubi Seven - SMK N 7 Semarang
EPIM - TI 2022

</center>

## Team
1. Ardhi Putra Pradana (Ketua)
2. Bintang Triadmaja

## Deskripsi
Projek ini adalah projek yang tim kami buat untuk memenuhi persyaratan pendaftaran dan juga mengikuti babak penyisihan dalam lomba atau event EPIM - TI 2022.

Projek ini merupakan projek untuk mengelola ekstrakurikuler yang dibuat dalam bentuk sebuah website.

## Stack / Teknologi yang digunakan
1. NextJS
2. TailwindCSS
3. PrismaJS
4. Cloudinary
5. NextAuth

## Instalasi
Disini kami asumsikan bahwa kita sudah memiliki NodeJS dikomputer kita, dan package manager `Yarn` atau `NPM` juga sudah terinstall.

1. Download atau clone projek ini
2. Buka terminal dan arahkan ke directory projek, lalu jalankan
```bash
$ yarn install
# atau
$ npm install
```
3. Copy atau rename file `.env.example` menjadi file `.env`
4. Isi file `.env` sesuai dengan data yang diperlukan
```
DATABASE_URL="mysql://janedoe:mypassword@localhost:3306/arlubi_seven"
NEXTAUTH_SECRET="SAME WITH SECRET"
SECRET="SAME WITH NEXTAUTH_SECRET"
NEXTAUTH_URL="http://localhost:3000"
CLOUDINARY_URL=cloudinary://my_key:my_secret@my_cloud_name
```
5. Menjalankan database
```bash
$ npx prisma migrate dev
```
akan melakukan pembuatan database dan melakukan seeding (mengisi data) ke dalam database
6. Menjalankan server
```bash
$ yarn dev
# or
$ npm run dev
```
7. Buka browser dan arahkan ke http://localhost:3000