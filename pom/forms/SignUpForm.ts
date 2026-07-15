import {Locator, expect} from '@playwright/test'
import { BaseForm } from './BaseForm';
import { ERROR_BORDER_COLOR } from '../../test-data/fieldBorder';

export class SignUpForm extends BaseForm {
    private readonly nameField: Locator = this.page.locator('#signupName');
    private readonly lastNameField: Locator = this.page.locator('#signupLastName');
    private readonly regEmailField: Locator = this.page.getByRole('textbox', { name: 'Name Last name Email' });
    private readonly regPasswordField: Locator = this.page.getByRole('textbox', { name: 'Password', exact: true });
    private readonly regRepeatPasswordField: Locator = this.page.getByRole('textbox', { name: 'Re-enter password' });
    public readonly registerButton: Locator = this.page.getByRole('button', { name: 'Register' });
    public readonly nameLengthMessage: Locator = this.page.getByText('Name has to be from 2 to 20');
    public readonly emptyNameMessage: Locator = this.page.getByText('Name required', { exact: true });
    public readonly invalidNameMessage: Locator = this.page.getByText('Name is invalid');
    public readonly lastNameLengthMessage: Locator = this.page.getByText('Last name has to be from 2 to 20 characters long');
    public readonly emptyLastNameMessage: Locator = this.page.getByText('Last name required');
    public readonly invalidLastNameMessage: Locator = this.page.getByText('Last name is invalid');
    public readonly emptyEmailMessage: Locator = this.page.getByText('Email required');
    public readonly invalidEmailMessage: Locator = this.page.getByText('Email is incorrect');
    public readonly emptyPasswordMessage: Locator = this.page.getByText('Password required');
    public readonly invalidPasswordMessage: Locator = this.page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    public readonly emptyRepeatPasswordMessage: Locator = this.page.getByText('Re-enter password required');
    public readonly notMatchRepeatPasswordMessage: Locator = this.page.getByText('Passwords do not match');


    async signUpWithCredentials(firstName: string, lastName: string, email: string, password: string, repeatPassword: string) {
        await this.enterNewName(firstName);
        await this.enterNewLastName(lastName);
        await this.enterRegEmail(email);
        await this.enterRegPassword(password);
        await this.enterRegRepeatSamePassword(repeatPassword);
        await this.clickRegisterButton();
    }

    async fillInWithCredentials(firstName: string, lastName: string, email: string, password: string, repeatPassword: string) {
        await this.enterNewName(firstName);
        await this.enterNewLastName(lastName);
        await this.enterRegEmail(email);
        await this.enterRegPassword(password);
        await this.enterRegRepeatSamePassword(repeatPassword);
    }

    async enterNewName(firstName: string) {
        await this.nameField.fill(firstName);
    }

    async enterNewLastName(lastName: string) {
        await this.lastNameField.fill(lastName);
    }

    async enterRegEmail(email: string) {
        await this.regEmailField.fill(email);
    }

    async enterRegPassword(password: string) {
        await this.regPasswordField.fill(password);
    }

    async enterRegRepeatSamePassword(password: string) {
        await this.regRepeatPasswordField.fill(password); 
    }

    async clickRegisterButton() {
        await this.registerButton.click();
    }

    async triggerErrorOnField(fieldName: string) {
        let field: Locator;
        if (fieldName === "firstName") {
            field = this.nameField;
        } else if (fieldName === "lastName") {
            field = this.lastNameField;
        } else if (fieldName === "email") {
            field = this.regEmailField;
        } else if (fieldName === "password") {
            field = this.regPasswordField;
        } else if (fieldName === "repeatPassword") {
            field = this.regRepeatPasswordField;
        } else {
            throw new Error('Wrong field name')
        }

        await field.focus();
        await field.blur();
    }

    
    // ------------------------- FIELD BORDER COLOR ------------------------- //

    private async expectFieldHasRedBorder(locator: Locator) {
        await expect(locator).toHaveCSS('border-color', ERROR_BORDER_COLOR);
    }

    private async expectFieldHasDefaultBorder(locator: Locator) {
        await expect(locator).not.toHaveCSS('border-color', ERROR_BORDER_COLOR);
    }
      
   

    async expectNameHasDefaultBorder() {
        await this.expectFieldHasDefaultBorder(this.nameField);
    }

    async expectNameHasRedBorder() {
        await this.expectFieldHasRedBorder(this.nameField);
    }

    async expectLastNameHasDefaultBorder() {
        await this.expectFieldHasDefaultBorder(this.lastNameField);
    }

    async expectLastNameHasRedBorder() {
        await this.expectFieldHasRedBorder(this.lastNameField);
    }

    async expectEmailHasDefaultBorder() {
        await this.expectFieldHasDefaultBorder(this.regEmailField);
    }

    async expectEmailHasRedBorder() {
        await this.expectFieldHasRedBorder(this.regEmailField);
    }

    async expectPasswordHasDefaultBorder() {
        await this.expectFieldHasDefaultBorder(this.regPasswordField);
    }

    async expectPasswordHasRedBorder() {
        await this.expectFieldHasRedBorder(this.regPasswordField);
    }

    async expectRepeatPasswordHasDefaultBorder() {
        await this.expectFieldHasDefaultBorder(this.regRepeatPasswordField);
    }

    async expectRepeatPasswordHasRedBorder() {
        await this.expectFieldHasRedBorder(this.regRepeatPasswordField);
    }


}