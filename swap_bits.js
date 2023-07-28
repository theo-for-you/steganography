
function hide_clear(data, keys) {
    data.forEach((_, ind) => {
        if ((ind + 1) % 4 == 0) return; //keep alpha

        data[ind] &= 240
        data[ind] ^= keys[ind % 3] // adding keys to decode dark parts
    })

    return data
}


function method_hide_decode(data) {
    random.refresh(); // start from 0 to decode
    let cover_row_len = canvas_res.width * 4

    // key to get currectly each color
    let bit_keys = Array.from({ length: 3 }, () => { return random.next(2 ** 4 - 1) })


    // decoding every bit
    data.forEach((_, ind) => {
        if ((ind + 1) % 4 == 0) return; // skip alpha

        data[ind] &= 2 ** 4 - 1
        data[ind] <<= 4

        data[ind] ^= bit_keys[ind % 3] << 4

    })

    let res_length = 0;
    let res_height = 0;



    // getting new length and height
    for (let row = 0; row < canvas_res.height; row++) {

        let row_data = data.slice(row * cover_row_len, (row + 1) * cover_row_len)

        // find first dark pixel
        let len = row_data.findIndex((elem, ind) => {
            return elem + row_data[ind + 1] + row_data[ind + 2] + 255 == 255
        })

        let sum = row_data.reduce((a, b) => a + b, 0)

        // find first dark row
        if (sum == 255 * canvas_res.width && !res_height) { res_height = row }

        // get not dark image border
        if (len > res_length) { res_length = len; }
    }

    // cut height
    let res_data = data.slice(0, res_height * cover_row_len)


    // cut width
    res_data = res_data.filter((_, ind) => {
        if (ind % cover_row_len >= res_length) { return false; }
        return true;
    })


    return [res_data, res_length / 4, res_height]
}

function method_hide_encode(data_source, data_cover) {
    random.refresh(); // start from 0 to decode

    let cover_row_len = canvas_res.width * 4
    let elem_in_one_row = canvas_temp.width * 4;

    // encode each r, g or  b to add entropy
    let bit_keys = Array.from({ length: 3 }, () => { return random.next(2 ** 4 - 1) })

    // clearing lower bits
    data_cover = hide_clear(data_cover, bit_keys)


    for (let row = 0; row < canvas_res.height; row++) {

        let row_data = data_source.slice(row * elem_in_one_row, (row + 1) * elem_in_one_row)

        row_data.forEach((elem, ind) => {
            if ((ind + 1) % 4 == 0) return; //keep alpha

            data_cover[row * cover_row_len + ind] &= 240 // clear lower piexls from dark encode

            data_cover[row * cover_row_len + ind] += (elem >> 4) ^ bit_keys[(row * cover_row_len + ind) % 3]
        })

    }

    return data_cover
}