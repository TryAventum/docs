---
title: Dashboard Hooks
date: "2020-03-22"
order: 205
---

## AppState(applyFiltersSync)

App component state.

### Parameters

- state(Object): The state.
- \$this(Object): The App component.

### Source

File: https://github.com/TryAventum/dashboard/tree/main/src/App.js

### Changelog

| Version | Description |
| ------- | ----------- |
| 1.0.0   | Introduced. |

## AppDidMount(doActionSync)

App component just mount.

### Parameters

- \$this(Object): The App component.

### Source

File: https://github.com/TryAventum/dashboard/tree/main/src/App.js

### Changelog

| Version | Description |
| ------- | ----------- |
| 1.0.0   | Introduced. |

## AppWillUnmount(doActionSync)

App component will unmount.

### Parameters

- \$this(Object): The App component.

### Source

File: https://github.com/TryAventum/dashboard/tree/main/src/App.js

### Changelog

| Version | Description |
| ------- | ----------- |
| 1.0.0   | Introduced. |

## AppDidUpdate(doActionSync)

The App component updated.

### Parameters

- prevProps(Object): App component previous props.
- prevState(Object): App component previous state.
- snapshot(\*): See [componentDidUpdate](https://reactjs.org/docs/react-component.html#componentdidupdate).

### Source

File: https://github.com/TryAventum/dashboard/tree/main/src/App.js

### Changelog

| Version | Description |
| ------- | ----------- |
| 1.0.0   | Introduced. |

## AppBeforeRender(doActionSync)

Fire at the beginning of the render function of the App component.

### Parameters

- \$this(Object): The App component.

### Source

File: https://github.com/TryAventum/dashboard/tree/main/src/App.js

### Changelog

| Version | Description |
| ------- | ----------- |
| 1.0.0   | Introduced. |

## HelmetAppHtmlAttributes(applyFiltersSync)

The HTML attributes for the Helmet component in the App component.

### Parameters

- htmlAttributes(Object): The HTML attributes object that will be passed to htmlAttributes property
  of the Helmet component.
- \$this(Object): The App component.

### Source

File: https://github.com/TryAventum/dashboard/tree/main/src/App.js

### Changelog

| Version | Description |
| ------- | ----------- |
| 1.0.0   | Introduced. |

## AppSuspenseFallback(applyFiltersSync)

The fallback of the suspense of the App component.

### Parameters

- fallback(Object): The fallback
- \$this(Object): The App component.

### Source

File: https://github.com/TryAventum/dashboard/tree/main/src/App.js

### Changelog

| Version | Description |
| ------- | ----------- |
| 1.0.0   | Introduced. |

## AppRoutes(applyFiltersSync)

The routes in the App component

### Parameters

- routes(Route[]): Array of routes from react-router-dom package
- \$this(Object): The App component.

### Source

File: https://github.com/TryAventum/dashboard/tree/main/src/App.js

### Changelog

| Version | Description |
| ------- | ----------- |
| 1.0.0   | Introduced. |

## AppRenderComponents(applyFiltersSync)

What the App component will render(return from the App render method)

### Parameters

- renderResult(Object): The final result from the render function that will be rendered.
- \$this(Object): The App component

### Source

File: https://github.com/TryAventum/dashboard/tree/main/src/App.js

### Changelog

| Version | Description |
| ------- | ----------- |
| 1.0.0   | Introduced. |

## getField(applyFiltersSync)

Get the field's constructor, when clicking on a field name button to add it to the schema
builder or the custom fields build this hook will be called for unknown or custom fields.

### Parameters

- type(string): the type of the field
- withId(boolean): whether we want id with the field or no

### Source

File: https://github.com/TryAventum/dashboard/tree/main/src/shared/fieldsHelpers.js

### Changelog

| Version | Description |
| ------- | ----------- |
| 1.0.0   | Introduced. |

## SchemaNFieldsOnDragEnd(applyFiltersSync)

Fires when dragging a controller ends.

### Parameters

- result(Object): Object contains the state of what happen after the drag like
  destination, source, and draggableId.
  [For more info see](https://github.com/atlassian/react-beautiful-dnd)

### Source

File: https://github.com/TryAventum/dashboard/tree/main/src/shared/utility.js

### Changelog

| Version | Description |
| ------- | ----------- |
| 1.0.0   | Introduced. |

## SchemaNFieldsOnDragEnd(doActionSync)

Fires when dragging a controller ends.

### Parameters

- result(Object): Object contains the state of what happen after the drag like
  destination, source, and draggableId.
  [For more info see](https://github.com/atlassian/react-beautiful-dnd)

### Source

File: https://github.com/TryAventum/dashboard/tree/main/src/shared/utility.js

### Changelog

| Version | Description |
| ------- | ----------- |
| 1.0.0   | Introduced. |

## HeaderCellsFieldsCondition(applyFiltersSync)

Whether to keep this field or remove it from the list.

### Parameters

- isOk(boolean): Whether to keep the field or no.
- field(Object): The field object from the schema model.
- \$this(Object): The DynamicContentList component.

### Source

File: https://github.com/TryAventum/dashboard/tree/main/src/components/DynamicContentList/DynamicContentList.js

### Changelog

| Version | Description |
| ------- | ----------- |
| 1.0.0   | Introduced. |

## HeaderCellsFields(applyFiltersSync)

The header cells(the table header cells) fields of the table.

### Parameters

- HeaderCellsFields(Array): The header cells fields that will be filtered.
- \$this(Object): The DynamicContentList component.

### Source

File: https://github.com/TryAventum/dashboard/tree/main/src/components/DynamicContentList/DynamicContentList.js

### Changelog

| Version | Description |
| ------- | ----------- |
| 1.0.0   | Introduced. |

## DynamicContentListSchema(applyFiltersSync)

The schema of the content that DynamicContentList component will render.

### Parameters

- schema(Object): The schema model.
- \$this(Object): The DynamicContentList component.

### Source

File: https://github.com/TryAventum/dashboard/tree/main/src/components/DynamicContentList/DynamicContentList.js

### Changelog

| Version | Description |
| ------- | ----------- |
| 1.0.0   | Introduced. |

## DynamicContentListRenderStarted(doActionSync)

The render method of the DynamicContentList component just called.

### Parameters

- \$this(Object): The DynamicContentList component.

### Source

File: https://github.com/TryAventum/dashboard/tree/main/src/components/DynamicContentList/DynamicContentList.js

### Changelog

| Version | Description |
| ------- | ----------- |
| 1.0.0   | Introduced. |

## DynamicContentListItems(applyFiltersSync)

The items that willbe rendered in the table.

### Parameters

- itemsToRender(Array): The items that will be rendered.
- \$this(Object): The DynamicContentList component.

### Source

File: https://github.com/TryAventum/dashboard/tree/main/src/components/DynamicContentList/DynamicContentList.js

### Changelog

| Version | Description |
| ------- | ----------- |
| 1.0.0   | Introduced. |

## emailConfirmation(doActionSync)

Fires after the server response to the email confirmation request on the email confirmation page
after the user clicks on the confirmation link in the email.

### Parameters

- response/error(Object): The server response(we use [Axios](https://github.com/axios/axios)),
  on success the current user data will be at response.data and the new authentication token at
  response.headers['x-access-token']
- payload(Object): the payload that sent to the server, it should contain the token at
  payload.token

### Source

File: https://github.com/TryAventum/dashboard/tree/main/src/store/actions/auth.js

### Changelog

| Version | Description |
| ------- | ----------- |
| 1.0.0   | Introduced. |

## resendConfirmationEmail(doActionSync)

Fires after running resendConfirmationEmail redux action which dispatched when the
user request to resend confirmation email.

### Parameters

- response/error(Object): The server response(we use [Axios](https://github.com/axios/axios))
  on success means the email was sent.

### Source

File: https://github.com/TryAventum/dashboard/tree/main/src/store/actions/auth.js

### Changelog

| Version | Description |
| ------- | ----------- |
| 1.0.0   | Introduced. |

## getOptions(doActionSync)

Run after getOptions Redux action completed.

### Parameters

- response/error(Object): The server response(we use [Axios](https://github.com/axios/axios)),
  on success the options will be at response.data.options

### Source

File: https://github.com/TryAventum/dashboard/tree/main/src/store/actions/option.js

### Changelog

| Version | Description |
| ------- | ----------- |
| 1.0.0   | Introduced. |

## getAllRoles(doActionSync)

Run after getAllRoles Redux action completed.

### Parameters

- response/error(Object): The server response(we use [Axios](https://github.com/axios/axios)),
  on success the roles will be at response.data.roles

### Source

File: https://github.com/TryAventum/dashboard/tree/main/src/store/actions/role.js

### Changelog

| Version | Description |
| ------- | ----------- |
| 1.0.0   | Introduced. |

## getAllTranslations(doActionSync)

Run after getAllTranslations Redux action completed.

### Parameters

- response/error(Object): The server response(we use [Axios](https://github.com/axios/axios)),
  on success the translations will be at response.data.translations

### Source

File: https://github.com/TryAventum/dashboard/tree/main/src/store/actions/translation.js

### Changelog

| Version | Description |
| ------- | ----------- |
| 1.0.0   | Introduced. |

## allUsersCount(doActionSync)

Run after allUsersCount Redux action completed.

### Parameters

- response/error(Object): The server response(we use [Axios](https://github.com/axios/axios)),
  on success all users count will be at response.data.count

### Source

File: https://github.com/TryAventum/dashboard/tree/main/src/store/actions/user.js

### Changelog

| Version | Description |
| ------- | ----------- |
| 1.0.0   | Introduced. |

## ValueRendererRenderStarted(doActionSync)

The render method of the ValueRenderer component just called.

### Parameters

- \$this(Object): The ValueRenderer component.

### Source

File: https://github.com/TryAventum/dashboard/tree/main/src/components/DynamicContentList/ValueRenderer/ValueRenderer.js

### Changelog

| Version | Description |
| ------- | ----------- |
| 1.0.0   | Introduced. |

## ValueRendererUnknownField(applyFiltersSync)

Filter the default value for the unknown field type of the ValueRenderer of the DynamicContentList.

### Parameters

- defaultValue(?\*): The default value that returned for the unknown field type.
- \$this(Object): The ValueRenderer component.

### Source

File: https://github.com/TryAventum/dashboard/tree/main/src/components/DynamicContentList/ValueRenderer/ValueRenderer.js

### Changelog

| Version | Description |
| ------- | ----------- |
| 1.0.0   | Introduced. |

## ValueRendererFinalValue(applyFiltersSync)

The final value for the field before the render

### Parameters

- value(\*): The final value
- \$this(Object): The ValueRenderer component.

### Source

File: https://github.com/TryAventum/dashboard/tree/main/src/components/DynamicContentList/ValueRenderer/ValueRenderer.js

### Changelog

| Version | Description |
| ------- | ----------- |
| 1.0.0   | Introduced. |

## FieldsButtonsSate(applyFiltersSync)

The state of the FieldsButtons component.

### Parameters

- state(Object): The state.
- \$this(Object): The FieldsButtons component.

### Source

File: https://github.com/TryAventum/dashboard/tree/main/src/components/Fields/FieldsButtons/FieldsButtons.js

### Changelog

| Version | Description |
| ------- | ----------- |
| 1.0.0   | Introduced. |

## FieldsButtonsRenderStarted(doActionSync)

The render method of the FieldsButtons component just started.

### Parameters

- \$this(Object): The FieldsButtons component.

### Source

File: https://github.com/TryAventum/dashboard/tree/main/src/components/Fields/FieldsButtons/FieldsButtons.js

### Changelog

| Version | Description |
| ------- | ----------- |
| 1.0.0   | Introduced. |

## FieldsButtonsCustomFields(applyFiltersSync)

The custom fields buttons.

### Parameters

- customFields(Array): The custom fields buttons that will be filtered
- \$this(Object): The FieldsButtons component.

### Source

File: https://github.com/TryAventum/dashboard/tree/main/src/components/Fields/FieldsButtons/FieldsButtons.js

### Changelog

| Version | Description |
| ------- | ----------- |
| 1.0.0   | Introduced. |

## FieldsButtonsDefault(applyFiltersSync)

The default buttons like the string and number buttons.

### Parameters

- defaultButtons(Array): The buttons that will be filtered.
- \$this(Object): The FieldsButtons component.

### Source

File: https://github.com/TryAventum/dashboard/tree/main/src/components/Fields/FieldsButtons/FieldsButtons.js

### Changelog

| Version | Description |
| ------- | ----------- |
| 1.0.0   | Introduced. |

## FieldsSettingsListRenderStarted(doActionSync)

The render method for the FieldsSettingsList component just started.

### Parameters

- \$this(Object): The FieldsSettingsList component.

### Source

File: https://github.com/TryAventum/dashboard/tree/main/src/components/Fields/FieldsSettingsList/FieldsSettingsList.js

### Changelog

| Version | Description |
| ------- | ----------- |
| 1.0.0   | Introduced. |

## FieldsSettingsListSettingsControls(applyFiltersSync)

The list of the controls in the FieldsSettingsList component.

### Parameters

- settingsControls(Array): the controls that we will filter.
- \$this(Object): The FieldsSettingsList component.

### Source

File: https://github.com/TryAventum/dashboard/tree/main/src/components/Fields/FieldsSettingsList/FieldsSettingsList.js

### Changelog

| Version | Description |
| ------- | ----------- |
| 1.0.0   | Introduced. |

## RenderFieldsOnDragEnd(applyFiltersSync)

Fires when dragging a controller ends.

### Parameters

- result(Object): Object contains the state of what happen after the drag like
  destination, source, and draggableId.
  [For more info see](https://github.com/atlassian/react-beautiful-dnd)
- \$this(Object): The RenderFields component.

### Source

File: https://github.com/TryAventum/dashboard/tree/main/src/components/Fields/RenderFields/RenderFields.js

### Changelog

| Version | Description |
| ------- | ----------- |
| 1.0.0   | Introduced. |

## RenderFieldsOnDragEnd(doActionSync)

Fires when dragging a controller ends.

### Parameters

- result(Object): Object contains the state of what happen after the drag like
  destination, source, and draggableId.
  [For more info see](https://github.com/atlassian/react-beautiful-dnd)
- \$this(Object): The RenderFields component.

### Source

File: https://github.com/TryAventum/dashboard/tree/main/src/components/Fields/RenderFields/RenderFields.js

### Changelog

| Version | Description |
| ------- | ----------- |
| 1.0.0   | Introduced. |

## variable(doActionSync)

Fires when the done button clicked in the SelectUploadsModal
The hook name either selectedUploadsModalDoneClicked or
[id]selectedUploadsModalDoneClicked

### Parameters

- selectedUploads(Array): The selected uploads in the modal.
- \$this(Object): SelectUploadsModal component.

### Source

File: https://github.com/TryAventum/dashboard/tree/main/src/components/UI/SelectUploadsModal/SelectUploadsModal.js

### Changelog

| Version | Description |
| ------- | ----------- |
| 1.0.0   | Introduced. |

## SideBarMenu(applyFiltersSync)

The SideBar menu data

### Parameters

- menu(Array): The menu data.
- \$this(Object): The SideBar component.

### Source

File: https://github.com/TryAventum/dashboard/tree/main/src/components/UI/SideBar/SideBar.js

### Changelog

| Version | Description |
| ------- | ----------- |
| 1.0.0   | Introduced. |

## SideBarOpenItems(applyFiltersSync)

The active item of SideBar's menu

### Parameters

- \_openItems(Object): The active item.
- \$this(Object): The SideBar component.

### Source

File: https://github.com/TryAventum/dashboard/tree/main/src/components/UI/SideBar/SideBar.js

### Changelog

| Version | Description |
| ------- | ----------- |
| 1.0.0   | Introduced. |

## SideBarMenuRender(applyFiltersSync)

The SideBar

### Parameters

- sideBar(Object): The returned value from the render method of the sidebar component.
- \$this(Object): The SideBar component.

### Source

File: https://github.com/TryAventum/dashboard/tree/main/src/components/UI/SideBar/SideBar.js

### Changelog

| Version | Description |
| ------- | ----------- |
| 1.0.0   | Introduced. |

## FieldsSettingsListItemHeaderRemoveIcon(applyFiltersSync)

The remove icon of the field's header(the controller).

### Parameters

- snapshot(Object): From the Draggable component of the react-beautiful-dnd package.
- \$this(Object): The FieldsSettingsListItem component.

### Source

File: https://github.com/TryAventum/dashboard/tree/main/src/components/Fields/FieldsSettingsList/FieldsSettingsListItem/FieldsSettingsListItem.js

### Changelog

| Version | Description |
| ------- | ----------- |
| 1.0.0   | Introduced. |

## FieldsSettingsListItemHeader(applyFiltersSync)

The controller(field) header.

### Parameters

- header(Object): The header, React component.
- snapshot(Object): From the Draggable component of the react-beautiful-dnd package.
- \$this(Object): The FieldsSettingsListItem component.

### Source

File: https://github.com/TryAventum/dashboard/tree/main/src/components/Fields/FieldsSettingsList/FieldsSettingsListItem/FieldsSettingsListItem.js

### Changelog

| Version | Description |
| ------- | ----------- |
| 1.0.0   | Introduced. |

## FieldsSettingsListItemField(applyFiltersSync)

The field that will be rendered.

### Parameters

- field(Object): React component.
- \$this(Object): The FieldsSettingsListItem component.

### Source

File: https://github.com/TryAventum/dashboard/tree/main/src/components/Fields/FieldsSettingsList/FieldsSettingsListItem/FieldsSettingsListItem.js

### Changelog

| Version | Description |
| ------- | ----------- |
| 1.0.0   | Introduced. |

## FieldsSettingsListItemRenderStarted(doActionSync)

The render method for the FieldsSettingsListItem component just started.

### Parameters

- \$this(Object): The FieldsSettingsListItem component.

### Source

File: https://github.com/TryAventum/dashboard/tree/main/src/components/Fields/FieldsSettingsList/FieldsSettingsListItem/FieldsSettingsListItem.js

### Changelog

| Version | Description |
| ------- | ----------- |
| 1.0.0   | Introduced. |

## BooleanFieldBeforeRender(doActionSync)

The render method of the BooleanField just started executing.

### Parameters

- \$this(Object): The BooleanField component.

### Source

File: https://github.com/TryAventum/dashboard/tree/main/src/components/Fields/FieldsTypes/BooleanField/BooleanField.js

### Changelog

| Version | Description |
| ------- | ----------- |
| 1.0.0   | Introduced. |

## BooleanFieldRender(applyFiltersSync)

What will BooleanField component render.

### Parameters

- result(Object): The returned value from the render method.
- \$this(Object): The BooleanField component.

### Source

File: https://github.com/TryAventum/dashboard/tree/main/src/components/Fields/FieldsTypes/BooleanField/BooleanField.js

### Changelog

| Version | Description |
| ------- | ----------- |
| 1.0.0   | Introduced. |

## DropdownFieldBeforeRender(doActionSync)

The render method of the DropdownField just started executing.

### Parameters

- \$this(Object): The DropdownField component.

### Source

File: https://github.com/TryAventum/dashboard/tree/main/src/components/Fields/FieldsTypes/DropdownField/DropdownField.js

### Changelog

| Version | Description |
| ------- | ----------- |
| 1.0.0   | Introduced. |

## DropdownFieldValidationMessage(applyFiltersSync)

Validation message of the DropdownField.

### Parameters

- validationMessage(Object): The message component that will be filtered.
- \$this(Object): The DropdownField component.

### Source

File: https://github.com/TryAventum/dashboard/tree/main/src/components/Fields/FieldsTypes/DropdownField/DropdownField.js

### Changelog

| Version | Description |
| ------- | ----------- |
| 1.0.0   | Introduced. |

## DropdownFieldSUIDropdown(applyFiltersSync)

The Dropdown component that used in DropdownField.

### Parameters

- dropdownField(Object): The field that will be rendered.
- \$this(Object): The BooleanField component.

### Source

File: https://github.com/TryAventum/dashboard/tree/main/src/components/Fields/FieldsTypes/DropdownField/DropdownField.js

### Changelog

| Version | Description |
| ------- | ----------- |
| 1.0.0   | Introduced. |

## DropdownFieldRender(applyFiltersSync)

What will DropdownField component render.

### Parameters

- result(Object): The returned value from the render method.
- \$this(Object): The DropdownField component.

### Source

File: https://github.com/TryAventum/dashboard/tree/main/src/components/Fields/FieldsTypes/DropdownField/DropdownField.js

### Changelog

| Version | Description |
| ------- | ----------- |
| 1.0.0   | Introduced. |

## DynamicTableBeforeRender(doActionSync)

The render method of the DynamicTable just started executing.

### Parameters

- \$this(Object): The DynamicTable component.

### Source

File: https://github.com/TryAventum/dashboard/tree/main/src/components/Fields/FieldsTypes/DynamicTable/DynamicTable.js

### Changelog

| Version | Description |
| ------- | ----------- |
| 1.0.0   | Introduced. |

## RelationSchema(applyFiltersSync)

The schema of the content that will be used in the Relation field.

### Parameters

- schema(Object): The schema object.
- \$this(Object): The Relation component.

### Source

File: https://github.com/TryAventum/dashboard/tree/main/src/components/Fields/FieldsTypes/Relation/Relation.js

### Changelog

| Version | Description |
| ------- | ----------- |
| 1.0.0   | Introduced. |

## RelationBeforeRender(doActionSync)

The render method of the Relation just started executing.

### Parameters

- \$this(Object): The Relation component.

### Source

File: https://github.com/TryAventum/dashboard/tree/main/src/components/Fields/FieldsTypes/Relation/Relation.js

### Changelog

| Version | Description |
| ------- | ----------- |
| 1.0.0   | Introduced. |

## FieldsSettingsListItemUnknownControllerType(applyFiltersSync)

Unknown controller type

### Parameters

- defaultValue(?\*): The default value is null, unless it get filtered.
- \$this(Object): The FieldsSettingsListItemController component.

### Source

File: https://github.com/TryAventum/dashboard/tree/main/src/components/Fields/FieldsSettingsList/FieldsSettingsListItem/FieldsSettingsListItemController/FieldsSettingsListItemController.js

### Changelog

| Version | Description |
| ------- | ----------- |
| 1.0.0   | Introduced. |

## FieldsSettingsListItemRenderedController(applyFiltersSync)

The controller that will be rendered.

### Parameters

- controller(paramType): The controller.
- \$this(Object): The FieldsSettingsListItemController component.

### Source

File: https://github.com/TryAventum/dashboard/tree/main/src/components/Fields/FieldsSettingsList/FieldsSettingsListItem/FieldsSettingsListItemController/FieldsSettingsListItemController.js

### Changelog

| Version | Description |
| ------- | ----------- |
| 1.0.0   | Introduced. |
