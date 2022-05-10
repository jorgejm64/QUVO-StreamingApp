export default function dateToFormat(date) {
    const monthsArray = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Nopviembre', 'Diciembre'];
    var dateSplited = [];
    let month = "";
    let monthClean;

    if (date.includes("/")) {
        dateSplited = date.split("/");
    }

    if (date.includes("-")) {
        //Split de date in an array
        dateSplited = date.split("-");

        //If month have a cero at the begining
        monthClean = dateSplited[1].replace(/^(0+)/g, '');

        //Asign de name of the month
        month = monthsArray[monthClean-1];

        return (dateSplited[2]+" de "+month+" de "+dateSplited[0]);
    }
}
