import icon from '!raw-loader!./assets/anchor.svg';

export default class Anchor {
  constructor({ data, config, api }){
    this.api = api;
    this.config = config;
    this.data = data;

    console.log(this.data);
  }

  render() {
    const wrapper = document.createElement('div');
    const input = document.createElement('input');

    wrapper.classList.add('cdx-block');
    wrapper.classList.add('cdx-anchor');
    wrapper.appendChild(input);

    input.classList.add('cdx-input');
    input.classList.add('cdx-anchor__input');
    input.placeholder = this.api.i18n.t('Type anchor ID...');
    input.value = this.data && this.data.id ? this.data.id : '';

    input.onblur = () => {
      const replaces = { ' ': '-', 'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e', 'ж': 'zh', 'з': 'z', 'ий': 'y', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'kh', 'ц': 'tc', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'u', 'я': 'ya' };

      String.prototype.replaceArray = function(find, replace) {
        let str = this;

        for (let i = 0; i < find.length; i++) {
          str = str.replace(new RegExp(find[i], 'g'), replace[i]);
        }

        return str;
      }

      let value = input.value;

      value = value.trim();
      value = value.toLowerCase();
      value = value.replaceArray(Object.keys(replaces), Object.values(replaces));
      value = value.replace(/[^a-z0-9\_\-]/g, '');

      input.value = value;
    };

    return wrapper;
  }

  save(wrapper) {
    return {
      id: wrapper.querySelector('input').value
    };
  }

  validate(data) {
    return !data.id.trim() ? false : true;
  }

  static get toolbox() {
    return {
      icon:   icon,
      title:  'Anchor'
    };
  }
}
