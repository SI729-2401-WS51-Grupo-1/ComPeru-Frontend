export class User{
    constructor(id,firstName,lastName,email,password,planId){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.planId = planId;
    }

    static fromDisplayableUser(displayableUser) {
        return new User(
            displayableUser.id,
            displayableUser.firstName,
            displayableUser.lastName,
            displayableUser.email,
            displayableUser.password,
            displayableUser.planId,);
    }

    static toDisplayableUser(user) {
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            planId: user.planId
        };
    }
}