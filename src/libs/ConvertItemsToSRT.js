function ConvertTimeToISO(time){
    const d = new Date(parseFloat(time) * 1000);
    return d.toISOString().substring(11, 23).replace('.', ',');
}

const ConvertItemsToSRT = (items) => {
    let srt = '';
    let i = 1;
    items.forEach((item) => {
    const { start_time, end_time, content } = item;
    srt += `${i}\n`;
    srt += `${ConvertTimeToISO(start_time)} --> ${ConvertTimeToISO(end_time)}\n`;

    srt += content + '\n';
    srt += '\n';
    i++;
    });

    return srt;
}

export default ConvertItemsToSRT;