import { faro } from "@grafana/faro-web-sdk";

export const trackMouseEnter = (sectionId: string) => {
  faro.api.startUserAction(sectionId, {
    actionType: "section-mouse-enter",
    actionName: sectionId,
  });
};

export const trackLinkClick = (link: string, actionName: string) => {
  faro.api.startUserAction(actionName, {
    actionType: "link-click",
    url: link,
    actionName: actionName,
  });
}

export const trackFormSubmit = (formId: string) => {
  faro.api.startUserAction(formId, {
    actionType: "form-submit",
    actionName: formId,
  });
}

export const trackSwitchClick = (switchId: string) => {
  faro.api.startUserAction(switchId, {
    actionType: "switch-click",
    actionName: switchId,
  });
}

export const trackButtonClick = (buttonId: string) => {
  faro.api.startUserAction(buttonId, {
    actionType: "button-click",
    actionName: buttonId,
  });
}

export const trackInputFocus = (inputId: string) => {
  faro.api.startUserAction(inputId, {
    actionType: "input-focus",
    actionName: inputId,
  });
}