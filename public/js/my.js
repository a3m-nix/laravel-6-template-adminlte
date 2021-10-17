    $('#flash-overlay-modal').modal();
    $(document).ready(function () {
        //$('div.alert').not('.alert-important').delay(3000).fadeOut(350);
        setTimeout(function () {
            $("tr.table-success").removeClass("table-success");
        }, 2000);
        console.log("Ready, Document loaded!");
    });
    /* 
        function updateStatusBaru(url, $token) {
            const options = {
                headers: {
                    'Authorization': '{{ $token }}',
                    'Accept': 'application/json',
                }
            };

            axios.get('http://localhost:8000/api/analis/ruang-list', options).then((response) => {
                console.log(response.data);
                console.log(response.status);
                console.log(response.statusText);
                console.log(response.headers);
                console.log(response.config);
            });
        } */

    function PopupCenter(url, title, w = 800, h = 800) {
        // Fixes dual-screen position                         Most browsers      Firefox
        var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : window.screenX;
        var dualScreenTop = window.screenTop != undefined ? window.screenTop : window.screenY;

        var width = screen.width;
        var height = screen.height;
        //var w = width;
        //var h = height-200;

        var systemZoom = width / window.screen.availWidth;
        var left = (width - w) / 2 / systemZoom + dualScreenLeft
        var top = (height - h) / 2 / systemZoom + dualScreenTop - 50
        var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w / systemZoom + ', height=' + h / systemZoom + ', top=' + top + ', left=' + left);

        // Puts focus on the newWindow
        if (window.focus) newWindow.focus();
    }

    function PopupCenterFull(url, title, w = 600, h = 400) {
        params = 'width=' + screen.width;
        params += ', height=' + screen.height;
        params += ', top=0, left=0'
        params += ', fullscreen=yes';
        params += ', directories=no';
        params += ', location=no';
        params += ', menubar=no';
        params += ', resizable=no';
        params += ', scrollbars=no';
        params += ', status=no';
        params += ', toolbar=no';


        newwin = window.open(url, 'FullWindowAll', params);
        if (window.focus) {
            newwin.focus()
        }
        return false;
    }
    $('#flash-overlay-modal').modal();

    function modalAjax(url, judul) {
        $.getJSON(url, null,
            function (response, textStatus, xhr) {
                if (xhr.status == 200) {
                    $('#modal-ajax').modal('show');
                    $("#exampleModalLabel").html(judul);
                    $('#modal-body-ajax').html(response.body);
                } else {
                    alert("Error, terjadi kesalahan sistem");
                }
            }
        );
    }

    function simpanAjax() {
        var loading_spinner = $('#loading_spinner');
        var btnSimpan = $("#btnSimpan");
        var form = $('#myForm');
        $.ajax({
            type: 'POST',
            url: form.attr('action'),
            dataType: "json",
            data: form.serialize(),
            beforeSend: function () {
                loading_spinner.show();
                btnSimpan.prop('disabled', true);
                btnSimpan.addClass("disabled");
            },
            error: function (request, status, error) {
                loading_spinner.hide();
                btnSimpan.prop('disabled', false);
                btnSimpan.removeClass("disabled");
                toastr.error("Error, Terjadi Kesalahan");
                console.log(error);
            },
            success: function (data, status, xhr) {
                //console.log(xhr.status);
                if (xhr.status == 200) {
                    /* loading_spinner.hide();
                    btnSimpan.prop('disabled', false);
                    btnSimpan.removeClass("disabled");
                    toastr.success(data.pesan);
                    loading_spinner.hide();
                    btnSimpan.prop('disabled', false);
                    btnSimpan.removeClass("disabled"); */
                    toastr.success(data.pesan);
                    window.location.reload();
                    /* $(".modal").removeClass("show");
                    $(".modal-backdrop").remove();
                    $('#modal-ajax').attr('display', 'none');
                    $('#modal-ajax').modal('hide'); */
                } else {
                    loading_spinner.hide();
                    btnSimpan.prop('disabled', false);
                    btnSimpan.removeClass("disabled");
                    toastr.error(data.pesan);
                    if (xhr.status == 422) {
                        $.each(data.responseJSON.errors, function (i, error) {
                            var el = $(document).find('[name="' + i + '"]');
                            el.after($('<span class="help-blocked" style="color: red;">' + error[0] + '</span>'));
                        });
                    }
                }

            },
            error: function (err) {
                console.log(err);
                loading_spinner.hide();
                btnSimpan.prop('disabled', false);
                btnSimpan.removeClass("disabled");
                toastr.error(err.responseJSON.pesan);
                $.each(err.responseJSON.errors, function (i, error) {
                    var el = $("#myForm").find('[name="' + i + '"]');
                    el.after($('<span class="help-blocked" style="color: red;">' + error[0] + '</span>'));
                });
            }
        });
        return false;
    }
