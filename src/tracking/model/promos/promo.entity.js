export class Promo {
    constructor(id,image,title='',description=''){
        this.id = id;
        this.image = image;
        this.title = title;
        this.description = description;
    }
    static fromDisplayablePromo(displayablePromo) {
        return new Promo(
            displayablePromo.id,
            displayablePromo.image,
            displayablePromo.title,
            displayablePromo.description);
    }

    static toDisplayablePromo(promo) {
            return {
                id: promo.id,
                image: promo.image,
                title: promo.title,
                description: promo.description
            };
        }
}