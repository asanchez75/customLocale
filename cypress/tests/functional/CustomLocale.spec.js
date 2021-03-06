/**
 * @file cypress/tests/functional/CustomLocale.spec.js
 *
 * Copyright (c) 2014-2020 Simon Fraser University
 * Copyright (c) 2000-2020 John Willinsky
 * Distributed under the GNU GPL v2. For full terms see the file docs/COPYING.
 *
 */

describe('Custom Locale plugin tests', function() {
	it('Enables and configures the plugin', function() {
		cy.login('admin', 'admin', 'publicknowledge');

		cy.get('ul[id="navigationPrimary"] a:contains("Settings")').click();
		cy.get('ul[id="navigationPrimary"] a:contains("Website")').click();
		cy.get('button[id="plugins-button"]').click();

		// Find and enable the plugin
		cy.get('input[id^="select-cell-customlocaleplugin-enabled"]').click();
		cy.waitJQuery();
		cy.get('div:contains(\'The plugin "Custom Locale Plugin" has been enabled.\')');
		cy.get('tr[id="component-grid-settings-plugins-settingsplugingrid-category-generic-row-customlocaleplugin"] a.show_extras').click();
		cy.get('a[id^="component-grid-settings-plugins-settingsplugingrid-category-generic-row-customlocaleplugin-customize-button-"').click();
		
		// FIXME: The new settings tab handler doesn't jump right to the correct tab.
		cy.get('button#customLocale-button').click();
		cy.get('span.label:contains("lib/pkp/locale/en_US/user.po")').parent().parent().parent().contains('Edit').click();
		cy.wait(1000); // Form init
		cy.get('input#searchString').type('user.affiliation');
		cy.get('button:contains("Search for key")').click();
		cy.get('tr.highlight').should('have.length', 1)
		cy.get('tr.highlight input[id="user.affiliation"]').type('Floog Bleem', {delay: 0});
		cy.get('button:contains("Save and continue")').click();
		cy.waitJQuery();
		cy.get('a:contains("Cancel")').click();

		// Check that the overridden locale key works.
		cy.get('a:contains("admin")').click();
		cy.get('a:contains("View Profile")').click();
		cy.wait(5000); // Delay to ensure cache refresh
		cy.get('a:contains("Contact")').click();
		cy.get('label[for^="affiliation-en_US"]:contains("Floog Bleem")');
	});
});
