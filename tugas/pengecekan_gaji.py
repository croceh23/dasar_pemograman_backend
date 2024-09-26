#program untuk mengecek apakah gaji dari 200.000
while True:
    gaji = int(input('masukkan jumlah gaji anda: '))

    if gaji > 1000000:
        print('selamat anda mendapatkan bonus!')
        break

    else:
        print('terimakasih sudah bekerja dengan baik.')
        ulang = input('apakah ingin mencobah lagi? (iya/tidak): ')

        if ulang.lower() != 'iya':
            print('program selesai.')
            break