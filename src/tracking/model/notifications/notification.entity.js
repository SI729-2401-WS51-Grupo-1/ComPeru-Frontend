export class Notification {
    constructor(id = "", title = "", description = ""){
        this.id = id;
        this.title = title;
        this.description = description;
    }

    static fromDisplayableNotification(displayableNoti) {
        return new Notification(
            displayableNoti.id,
            displayableNoti.title,
            displayableNoti.description);
    }

    static toDisplayableNotification(noti) {
        return {
            id: noti.id,
            title: noti.title,
            description: noti.description
        };
    }
}