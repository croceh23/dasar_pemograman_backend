password_benar = 140505

while True:
    password = input('massukkan password: ')

    if password == password_benar:
        print('selamat anda berhasil login!')
        break
    else:
        print('password salah coba lagi.')
        ulang = input('apakah ingin mencoba lagi? (iya/tidak): ')
        if ulang.lower() != 'iya':
            print('terimkasih sudah menggunakan aplikasi kami.')
            break