// hint for the ts compiler
declare var $;
declare var ons;
declare var Contact;
declare var ContactField;
declare var ContactName;

class ContactController {

    private $contactsHolder = $('#contacts');

    constructor(private contactService) {
    }

    addContact() {

        /*-----------------------------------------------------------
         | Read form values
         | ----------------------------------------------------------
         | the `.val()` method return the value of the input
         | Sometimes you may need to call the `.trim()` method to
         | remove the unecessary whitespaces
         |
         | Here we are using the **Attribute Selection** we can
         | use any method of selection for example by Class or by Id
         |---------------------------------------------------------*/
        var displayName = $('[name=displayName]').val();
        var name = $('[name=name]').val();
        var nickname = $('[name=nickname]').val();
        var phoneNumbers = $('[name=phoneNumbers]').val();
        var emails = $('[name=emails]').val();
        var note = $('[name=note]').val();


        // create a new contact instance
        var myContact = this.contactService.create();

        // fill the contact fields
        myContact.displayName = displayName;
        myContact.name = new ContactName(null, name, nickname);
        myContact.nickname = nickname;

        // note that a contact my have multiple phone numbers, for this reason
        // the phoneNumbers is of type Array<ContactField>
        myContact.phoneNumbers = [
            new ContactField('home', phoneNumbers),
        ];

        // same note as phoneNumbers
        myContact.emails = [
            new ContactField('work', emails),
        ];

        myContact.note = note;

        // Save the contact to the phone database
        myContact.save(function onSuccess(contact) {

            ons.notification.toast({ message: 'contact saved', timeout: 2000 });

            // rerender the page
            this.renderAll();

            // clear inputs
            $('[name=form-add-contact] input').val('');

            // hide the dialog
            hideDialog('dialog-add-contact');

        }, function onError(err) {

            // show error dialog
            ons.notification.alert('Failed to save the contact');
        });
    }


    renderAll() {

        // check this link https://github.com/apache/cordova-plugin-contacts#contactfieldtype
        var types = this.contactService.fieldType;
        
        var fieldsToSearchOn = [
            types.name, 
            types.displayName,
            types.middleName,
            types.familyName,
            types.givenName,
            types.nickName
        ];

        var searchOptions = {
            filter: '',
            multiple: true
        };

        var items = this.contactService.find(
            fieldsToSearchOn,
            (contacts) => {
                this._renderItems(this.$contactsHolder, contacts);
            },
            (error) => {
                ons.notification.alert('Failed to retrieve contacts');
            },
            searchOptions
        );

    }

    private _renderItems($holder, items) {

        $holder.empty(); // same as $holder.html('');

        if (items.length > 0) {
            items.forEach(todo => this._renderItem($holder, todo));
        } else {
            // show a no-data message 
            $holder.append('<ons-list-header>No Contacts found</ons-list-header>');
        }
    }

    private _renderItem($holder, contact) {

        var phonenumber = '<i>No phone number</i>';

        if (contact.phoneNumbers && contact.phoneNumbers.length > 0 && contact.phoneNumbers[0].value) {
            phonenumber = contact.phoneNumbers[0].value;
        }

        var htmlTmpl = `
        <ons-list-item>
            <div class="left">
                <ons-icon icon="md-face" class="list-item__icon"></ons-icon>
            </div>
            <div class="center">
                <span class="list-item__title">${contact.name.formatted}</span>
                <span class="list-item__subtitle">${phonenumber}</span>
            </div>
        </ons-list-item>`;

        // remember: when passing html to the $() => we are creating an element and NOT selecting
        var $contact = $(htmlTmpl);

        $holder.append($contact);

    }

}