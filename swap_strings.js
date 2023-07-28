

function swap_strings(data, swap_length) {

    let row_len = canvas_res.width * 4;
    let half_height = Math.floor(canvas_res.height / 2);

    // swapping symmetric
    if (swap_length >= half_height) return data;

    let slice_1 = data.slice(0, swap_length * row_len);
    let slice_2 = data.slice((half_height + 1) * row_len, (half_height + 1 + swap_length) * row_len);

    // swapping parts
    slice_2.forEach((element, ind) => {
        data[ind] = element;
    });

    slice_1.forEach((element, ind) => {
        data[(half_height + 1) * row_len + ind] = element;
    });


    return data;

}

function method_swap(data, params) {
    let swaps_num = 5
    random.refresh(); // start from 0 to decode

    let swaps = Array.from({ length: swaps_num }, () => { return random.next(params.half_height) })

    if (params.decode == true) { swaps.reverse() };

    swaps.forEach((swap_num) => {
        data = swap_strings(data, swap_num)
    })

    return data;
}
