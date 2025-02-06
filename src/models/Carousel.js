import mongoose from 'mongoose';

// Sous-schéma pour les slides
const slideSchema = new mongoose.Schema({
    src: {
        type: String,
        required: true,
    },
    alt: {
        type: String,
        required: true,
    },
    width: {
        type: Number,
        required: true,
    },
    height: {
        type: Number,
        required: true,
    }
});

// Schéma principal du carousel
const carouselSchema = new mongoose.Schema({
    slides: {
        type: [slideSchema],
        required: true,
        validate: [
            {
                validator: function(slides) {
                    return slides.length >= 3;
                },
                message: 'Un carousel doit contenir au moins 3 images'
            },
            {
                validator: function(slides) {
                    return slides.length <= 10;
                },
                message: 'Un carousel ne peut pas contenir plus de 10 images'
            }
        ]
    }
});


// Vérifiez si le modèle existe déjà avant de le créer
const CarouselModel = mongoose.models.carousels || mongoose.model('carousels', carouselSchema);

export default CarouselModel;