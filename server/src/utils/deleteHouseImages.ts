import rimraf from 'rimraf';

export const deleteHouseImages = async (images: string[], userId: any) => {
    images.map(async (img) => {
        await rimraf(`public/images/${userId}/${img}`, () => { console.log("done") });
    });
};