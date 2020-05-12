# Testing SIMOJAN App

Pengujian dengan menggunakan mobile Android dan PC dengan OS Ubuntu Mate. Adapun langkah yang harus dilakukan:
- Pairing bluetooth
- Aktifkan bluetooth command server
- Mengirim data dari ubuntu ke mobile
- Menerima data dari mobile ke ubuntu

### Pairing bluetooth
Aktifkan bluetooth di mobile. Kemudian di PC, buka terminal kemudian jalankan perintah berikut
```sh
$ sudo bluetoothctl
[bluetooth]# power on
[bluetooth]# agent on
[bluetooth]# scan on
[bluetooth]# pair <dev>
[bluetooth]# exit
```
### Aktifkan bluetooth command server
```sh
$ sudo rfcomm watch hci0
Waiting for connection on channel 1
```
Biarkan terminal dalam kondisi tersebut. Kemudian buka SIMOJAN App, di bagian 'Select Bluetooth' pilih PC.
### Mengirim data dari ubuntu ke mobile
Buka terminal di dalam folder test ini. Kemudian jalankan file test.sh.
```sh
$ sudo su
.../simojan-app/test# bash test.sh
```
Dalam aplikasi SIMOJAN akan secara otomatis tampil widget Survey Running.
### Menerima data dari mobile ke ubuntu
Buka terminal lain di PC, kemudian jalankan perintah berikut.
```sh
$ sudo su
# cat /dev/rfcomm0
```
Dalam aplikasi SIMOJAN tekan tombol 'STOP SURVEY', kemudian di terminal akan tampil data yang diterima dari mobile.