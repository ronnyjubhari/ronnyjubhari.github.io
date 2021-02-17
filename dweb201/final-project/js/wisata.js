const endpoint_url='https://51018019.p-web.click/final-project/api';

function getCityList() {
  fetch(endpoint_url + "/city/citylist")
    .then(status)
    .then(json)
    .then(function(data) {

      var tb_header = `
          <div style="margin-bottom:35px;"></div>
            <div class="col m6 s12" style="margin-top:20px;">
              <div class="card waves-effect waves-block waves-light z-depth-3">
                <div class="card-image">
                  <img class="responsive-img"
                       src="img/wisata_1080.jpg"
                       srcset="img/wisata_480.jpg 480w,
                               img/wisata_720.jpg 720w,
                               img/wisata_1080.jpg 1080w"
                       size="100vw"
                       alt="Wisata Indonesia">
                </div>
              </div>
            </div>

            <div class="col m6 s12">
                <table id="tb_citylist"">
                  <thead>
                  <tr>
                    <th class="kepala">Kota Wisata</th>
                    </tr>
                  </thead>
                  <tbody>
                  </tbody>
                </table>
            </div>
          `;

      $("#data_output").html( tb_header );

        $('#tb_citylist').DataTable({
          "paging": false,
          "ordering": false,
          "info": false,
          "searching": false,
          "border": false,
          "data": data.kota,
          "columns": [
            { "render": function(data, type, row, meta) {
                          data = '<div class="collection space"><a class="collection-item" href="wisata.html?id=' + row.k_code +'"><img src="../img/next.png" style="margin:0px 15px -10px 20px;">' + row.nama_kota + '</a></div> ';
                          return data;
                        } }
          ]
      });
      $('select').formSelect();
    })
    .catch(error);
}

function getWisataList(id) {
  fetch( endpoint_url + "/wisata/detail/id/" + id )
    .then(status)
    .then(json)
    .then(function(data) {

      var title = "";
      var daftarwisata = "";
      data.wisata.forEach(function(wisata) {
        daftarwisata += `
            <h4 id="tb_title" class="center-align" style="margin-bottom:50px;"> </h4>
            <table style="margin-bottom:10px;box-shadow: 0 3px 30px #182b3c;">
              <tr>
                  <th class="tabel center-align" rowspan="6" width="200"
                    style="background:#182b3c;color:#fff;width: 200px;margin: 120px auto 0;text-align: center;font-size: 16px;">
                    ${wisata.nama_wisata}
                  </th>
              </tr>
              <tr>
                <td class="tabel">Lokasi: ${wisata.lokasi}</td>
              </tr>
              <tr>
                <td class="tabel">Jam Operasional: ${wisata.operasional}</td>
              </tr>
              <tr>
                <td class="tabel">Harga Tiket Masuk/Parkir: ${wisata.tiket}</td>
              </tr>
              <tr>
                <td class="tabel">Fasilitas: ${wisata.fasilitas}</td>
              </tr>
              <tr>
                <td class="tabel">Deskripsi: ${wisata.deskripsi}</td>
              </tr>
            </table>
            `;

        title = `<strong style="color:#182b3c;">Wisata ${wisata.nama_kota}</strong>`;
      });
      document.getElementById("data_output").innerHTML = daftarwisata;
      document.getElementById("tb_title").innerHTML = title;
    })
    .catch(error);
}
