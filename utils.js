



function add_alfa(data) {

    for (let i = 0; i < data.length; i++) {
        if ((i + 1) % 4 == 0) data[i] = 255;
    }

    return data
}



function draw(canvas, file, call) {
    let img = new Image()
    let context = canvas.getContext('2d');


    img.src = URL.createObjectURL(file);

    img.onload = () => {
        canvas.height = img.naturalHeight
        canvas.width = img.naturalWidth

        context.drawImage(img, 0, 0)

        call();
    }
}

function get_data(canvas) {
    let context = canvas.getContext("2d");
    let data = context.getImageData(0, 0, canvas.width, canvas.height).data;
    data = Array.from(data)

    return data
}

function put_data(canvas, new_data) {
    new_data = add_alfa(new_data)

    let context = canvas.getContext("2d");
    let data = context.getImageData(0, 0, canvas.width, canvas.height);
    data.data.set(new_data)

    context.putImageData(data, 0, 0);
}