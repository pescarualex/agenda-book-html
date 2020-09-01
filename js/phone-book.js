window.AgendaBook = {

    API_URL: "http://localhost:8082/agenda",

    createContact: function () {

        const firstNameValue = $('#first-name-value').val();
        const lastNameValue = $('#last-name-value').val();
        const phoneNumberValue = $('#phone-number-value').val();

        let body = {
            firstName: firstNameValue,
            lastName: lastNameValue,
            phoneNumber: phoneNumberValue
        };

        $.ajax({
            url: AgendaBook.API_URL,
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(body)
        }).done(function () {
            AgendaBook.getContact();
        });
    },

    getContact: function () {
        $.ajax({
            url: AgendaBook.API_URL,
            method: "GET"
        }).done(function (response) {
            AgendaBook.displayContact(JSON.parse(response));
        });
    },

    updateContact: function (id, firstName, lastName, phoneNumber) {

        let body = {
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber
        }

        $.ajax({
            url: AgendaBook.API_URL + '?id=' + id,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(body)
        }).done(function () {
            AgendaBook.getContact();
        });
    },

    deleteContact: function (id) {
        $.ajax({
            url: AgendaBook.API_URL + '?id=' + id,
            method: 'DELETE',
        }).done(function () {
            AgendaBook.getContact();
        });
    },

    getContactRow: function (contact) {
        return `
            <tr>
              <td>${contact.firstName}</td>
              <td>${contact.lastName}</td>
              <td>${contact.phoneNumber}</td>
              <td><a href="#" class="delete-link" data-id=${contact.id}><i class="fas fa-trash-alt"></i>
                  <a href="#" class="edit-link" data-id=${contact.id}><i class="fa fa-edit"></i>
              </td>
            </tr>
        `
    },

    displayContact: function (contacts) {
        let contactsHtml = '';

        contacts.forEach(contact => contactsHtml += AgendaBook.getContactRow(contact));

        $('#phone-book tbody').html(contactsHtml);
    },

    bindEvents: function () {
        $('.add-form').submit(function (event) {
            event.preventDefault();

            AgendaBook.createContact();
        });

        $('.add-form').delegate('.delete-link', 'click', function (event) {
            event.preventDefault();

            const id = $(this).data('id');

            AgendaBook.deleteContact(id);
        });


        $('.add-form').delegate('.edit-link', 'click', function (event) {

            

        });


    }
};

AgendaBook.getContact();
AgendaBook.bindEvents();
