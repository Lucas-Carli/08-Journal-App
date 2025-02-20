import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from "../../src/helpers/fileUpload";

//This part is secret, only be used for nodeJS context (Server)
cloudinary.config({
    cloud_name: 'ddcmtb9e9',
    api_key: '252414271781547',
    api_secret: '6Av7IEuStYOeL0MU6hOcLenr-kU',
    secure: true,
});


describe('Tests in fileUplad', () => {

    test('you must upload the file correctly to Cloudinary', async () => {

        const imageUrl = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIA2MjJxFOhp3ta3XNeuSQFzQ41zB4pNhV3w&s`;
        const resp = await fetch(imageUrl);
        const blob = await resp.blob();
        const file = new File([blob], 'photo.jpg');

        const url = await fileUpload(file);
        expect(typeof url).toBe('string');

        // console.log(url)
        const segments = url.split('/');

        // console.log(segments);
        const imageId = segments[segments.length - 1].replace('.jpg', '');
        // console.log({ imageId })

        const cloudResp = await cloudinary.api.delete_resources([imageId], {
            resource_type: 'image'
        });

    });

    test('must return null', async () => {

        const file = new File([], 'photo.jpg');
        const url = await fileUpload(file);
        expect(url).toBe(null);

    })

});