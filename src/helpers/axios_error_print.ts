import * as toastr from "toastr";

export const axios_error_print = (response:any) => {
    if (response.status === undefined)
        return console.log(response);

    if (response.status === 419)
        return false;

    if (response.status === 401)
        return toastr.error('გაიარეთ ავტორიზაცია');

    if (typeof response == 'string')
        return toastr.error(response);

    if (typeof response.data.message != 'undefined' && typeof response.data.errors == 'undefined')
        toastr.error(response.data.message);

    if (typeof response.data.errors !== 'undefined') {
        let errors:string[] = [];

        for (let key in response.data.errors){
            let error = response.data.errors[key];

            error.forEach((errorItem:string) => {
                errors.push(errorItem);
            })
        }

        errors.forEach((error, i) => {
            if (i < 5)
                toastr.error(error);
        })

        if (errors.length > 5)
            toastr.error('და კიდევ ' + (errors.length - 5) + ' შეცდომა');
    }
}