export const colorSort = (pallete, color) => {
    const hue = color[0];
    var analogous = [color];
    var complementary = [color];
    var split_complementary = [color];
    var triadic = [color];
    var tetriadic = [color];
    var rectangle = [color];

    pallete.forEach((row) =>
        row.forEach((clr) => {
            const he = clr[0];

            // analogous
            if (he >= (hue + 25) % 360 && he <= (hue + 35) % 360) analogous.push(clr);
            if (he <= (360 + hue - 25) % 360 && he >= (360 + hue - 35) % 360)
                analogous.push(clr);

            // complementary
            if (he <= (hue + 185) % 360 && he >= (hue + 175) % 360)
                complementary.push(clr);

            //   split complementary
            if (he >= (hue + 145) % 360 && he <= (hue + 155) % 360)
                split_complementary.push(clr);
            if (he >= (hue + 205) % 360 && he <= (hue + 215) % 360)
                split_complementary.push(clr);

            //   triadic
            if (he >= (hue + 115) % 360 && he <= (hue + 125) % 360) triadic.push(clr);
            if (he >= (hue + 235) % 360 && he <= (hue + 245) % 360) triadic.push(clr);

            //   tetriadic
            if (
                (he >= (hue + 85) % 360 && he <= (hue + 95) % 360) ||
                (he >= (hue + 175) % 360 && he <= (hue + 185) % 360) ||
                (he >= (hue + 265) % 360 && he <= (hue + 275) % 360)
            )
                tetriadic.push(clr);

            // rectangule
            if (
                (he >= (hue + 55) % 360 && he <= (hue + 65) % 360) ||
                (he >= (hue + 175) % 360 && he <= (hue + 185) % 360) ||
                (he >= (hue + 235) % 360 && he <= (hue + 245) % 360)
            )
                rectangle.push(clr);
        })
    );

    analogous.sort((a, b) => a[0] - b[0]);
    complementary.sort((a, b) => a[0] - b[0]);
    split_complementary.sort((a, b) => a[0] - b[0]);
    triadic.sort((a, b) => a[0] - b[0]);
    rectangle.sort((a, b) => a[0] - b[0]);
    tetriadic.sort((a, b) => a[0] - b[0]);

    return {
        analogous,
        complementary,
        split_complementary,
        triadic,
        rectangle,
        tetriadic,
    };
};
