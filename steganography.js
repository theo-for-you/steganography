


const canvas_temp = document.createElement("canvas")

window.onload = () => {
    // image_cover_div visibility
    if (document.getElementById("bit_swap").checked && !document.getElementById("dec").checked) {
        document.getElementById("image_cover_div").style.visibility = "visible";
    }
    else {
        document.getElementById("image_cover_div").style.visibility = "hidden";
    }

    set_res(input_image.files[0], "input_image")
    set_res(input_image_cover.files[0], "input_image_cover")
}

start_but.onclick = async () => {

    // none of them checked
    if (!(document.getElementById("bit_swap").checked || document.getElementById("string_swap").checked) ||
        !(document.getElementById("enc").checked || document.getElementById("dec").checked)) {
        return;
    }

    await random.set_key(key.value);

    // using one image
    try {
        draw(canvas_res, input_image_cover.files[0], start_here)
    } catch {
        start_here()
    }

    function start_here() {
        loading(true)
        draw(canvas_temp, input_image.files[0], () => {
            setTimeout(start, 1000) // time to set loading
        });
    }
}

function set_res(f, id) {
    let img = new Image()

    img.src = URL.createObjectURL(f);
    let res = document.getElementById(id + '_res')

    img.onload = () => {
        res.innerHTML = img.naturalWidth + "x" + img.naturalHeight
    }
}

document.getElementById("input_image").onchange = (e) => { set_res(e.target.files[0], "input_image") }

document.getElementById("input_image_cover").onchange = (e) => { set_res(e.target.files[0], "input_image_cover") }

document.getElementById("dec").onclick = () => { hide("image_cover_div", "hidden") }

document.getElementById("enc").onclick = () => {
    if (document.getElementById("string_swap").checked) return;
    hide("image_cover_div", "visible")
}

document.getElementById("bit_swap").onclick = () => {
    if (document.getElementById("dec").checked) return;
    hide("image_cover_div", "visible")
}

document.getElementById("string_swap").onclick = () => { hide("image_cover_div", "hidden") }

function hide(id, set) {
    document.getElementById(id).style.visibility = set;
}

async function start() {

    let data_source = get_data(canvas_temp)
    let data_cover = get_data(canvas_res)

    let res = []

    if (document.getElementById("bit_swap").checked) {
        if (document.getElementById("enc").checked) {
            if (canvas_temp.height > canvas_res.height || canvas_temp.width > canvas_res.width) {
                alert("Type another image");
                loading(false)
                return;
            }

            res = method_hide_encode(data_source, data_cover)
        }
        else {
            let [res_data, length, height] = method_hide_decode(data_source)

            res = res_data

            canvas_res.height = height
            canvas_res.width = length
        }
    }
    else {
        canvas_res.height = canvas_temp.height
        canvas_res.width = canvas_temp.width

        res = method_swap(data_source, {
            decode: document.getElementById("dec").checked,
            half_height: Math.floor(canvas_temp.height / 2)
        })
    }

    put_data(canvas_res, res)

    loading(false)

}


function loading(state) {

    if (state) {
        document.getElementById("load").style.visibility = "visible";
        start_but.style.visibility = "hidden";

    } else {
        document.getElementById("load").style.visibility = "hidden";
        start_but.style.visibility = "visible";
    }
}



