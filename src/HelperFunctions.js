/* Helper function to go from one screen to another */
export function gotToScreen(name) {
    document.location.pathname = "/" + name;
}


let active_object = {};

// Helper build object function
export function buildObject(
    obj_number,
    obj_name,
    obj_type,
    ex_location,
    ex_showcase,
    caption,
    image,
    col_name,
    col_add,
    col_phone,
    insurance,
    mus_id,
    transp,
    date_dep,
    date_arr,
    cond_rep
) {
    let obj = {
        object_number: obj_number,
        object_name: obj_name,
        object_type: obj_type,
        exhibition_location: ex_location,
        exhibition_showcase: ex_showcase,
        caption: caption,
        image: image,
        collector_name: col_name,
        collector_address: col_add,
        collector_phone: col_phone,
        insurance: insurance,
        museum_id: mus_id,
        transport: transp,
        date_of_departure: date_dep,
        date_of_arrival: date_arr,
        condition_report: cond_rep
    }
    active_object = obj;

    return obj;
}
