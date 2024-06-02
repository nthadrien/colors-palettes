


export const colorSort = (pallete, color ) => {

    const hue = color[0];
    var monochrome = [color];
    var analogous = [color];
    var complementary = [color];
    var split_complementary = [color];
    var triadic = [color];
    var tetriadic =[color];
    var rectangle = [color];

    

    pallete.forEach(row =>  row.forEach(
        clr => {
            const he = clr[0];
            if ( he === hue ) monochrome.push(clr);
            if(  he === (hue + 30)%360 || he === Math.abs(30-hue) ) analogous.push(clr);
            if ( he === (hue + 180) ) complementary.push(clr);
            if ( he === (hue + 150)%360 || he === (hue + 210)%360) split_complementary.push(clr);
            if ( he === (hue + 120)%360 || he === (hue + 240)%360) triadic.push(clr);
            if ( he === (hue + 90)%360 || he === (hue + 180)%360 || he === (hue + 270)%360) tetriadic.push(clr);
            if ( he === (hue + 90)%360 || he === (hue + 160)%360 || he === (hue + 270)%360) rectangle.push(clr);
        }
    ));

    return {
        monochrome, 
        analogous, 
        complementary, 
        split_complementary,
        triadic,
        rectangle, 
        tetriadic
    }

}