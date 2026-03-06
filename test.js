const synonyms = ['hello', 'hi'];

const createElements = (arr) => {
    const htmlElemts = arr.map((el) => `<span class="btn">${el}</span>`);

    console.log(htmlElemts.join(" "));
}

createElements(synonyms);