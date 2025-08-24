export const formStyles = {
  section: {
    base: 'flex flex-col self-stretch bg-white rounded-2xl w-full p-8 gap-4',
    withBorder: 'border border-figma-secondary-500',
  },

  sectionHeader: {
    container: 'flex flex-col gap-1',
    title: 'font-noto-serif-h5-bold text-[18px] text-figma-primary-950',
  },

  field: {
    container: 'w-full',
    spacing: 'space-y-6',
    row: 'grid grid-cols-2 gap-4',
    flexRow: 'flex gap-8 items-start justify-start w-full',
  },

  label: {
    base: 'font-noto-serif-bold text-[18px] leading-[1.5] text-figma-primary-950',
    required:
      'font-noto-sans text-[18px] leading-[1.5] text-figma-function-alert',
    wrapper: 'flex flex-wrap gap-0.5 items-center justify-start',
    inner: 'flex gap-1 items-center justify-start',
    subText:
      'font-genseki-body-s-regular text-[14px] leading-[1.5] text-figma-primary-950',
  },

  input: {
    base: 'flex w-full bg-transparent outline-none transition-colors',
    border: 'border-0 border-b border-[rgba(56,56,65,0.7)] px-0 py-3',
    font: 'font-genseki-body-m-regular text-[16px] leading-[1.2] text-figma-primary-950',
    placeholder: 'placeholder:text-figma-primary-300',
    focus: 'focus:border-figma-primary-950 focus:outline-none',
    disabled: 'disabled:cursor-not-allowed disabled:opacity-50',
    invalid: 'aria-invalid:border-figma-function-alert',
  },

  radio: {
    container: 'box-border flex gap-4 items-center justify-start px-0 py-3',
    group: 'flex gap-4 items-center',
    label:
      'flex items-center gap-1 font-genseki-body-m-regular text-[16px] leading-[1.2] text-figma-primary-950 cursor-pointer',
  },

  counter: {
    container:
      'flex gap-2.5 items-center justify-start px-0 py-3 border-b border-[rgba(56,56,65,0.7)]',
    label:
      'flex-1 font-genseki-body-m-regular text-[16px] leading-[1.2] text-figma-primary-950',
    button: {
      base: 'backdrop-blur-sm rounded-[25px] p-[2px] shrink-0 cursor-pointer hover:opacity-80',
      decrement: 'border border-[#b7b8c2]',
      increment: 'border border-figma-primary-950',
      icon: 'size-4 flex items-center justify-center',
    },
    value: {
      container: 'flex gap-[3px] items-center justify-start',
      text: 'font-genseki-body-s-regular text-[14px] leading-[1.5] text-figma-primary-950',
    },
  },

  button: {
    primary:
      'px-8 py-3 font-genseki-body-m-medium text-[16px] leading-[1.2] bg-figma-secondary-500 hover:bg-figma-secondary-950 text-figma-neutral-0 rounded-lg transition-all duration-200',
    disabled: 'disabled:opacity-50 disabled:cursor-not-allowed',
  },

  text: {
    counter:
      'font-genseki-body-s-regular text-[14px] leading-[1.5] text-figma-primary-300',
    privacy:
      'font-genseki-body-s-regular text-[14px] leading-[1.5] text-figma-primary-950',
  },
}

export const layoutStyles = {
  flexCol: 'flex flex-col',
  flexRow: 'flex flex-row',
  itemsCenter: 'items-center',
  justifyStart: 'justify-start',
  justifyCenter: 'justify-center',
  justifyBetween: 'justify-between',
  gap: {
    1: 'gap-1',
    2: 'gap-2',
    3: 'gap-3',
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8',
  },
  spacing: {
    y6: 'space-y-6',
    y8: 'space-y-8',
  },
}

export function getFormFieldClasses(
  variant: keyof typeof formStyles.field = 'container',
) {
  return formStyles.field[variant]
}

export function getLabelClasses(
  required: boolean = false,
  hasSubText: boolean = false,
) {
  return {
    wrapper: formStyles.label.wrapper,
    inner: formStyles.label.inner,
    base: formStyles.label.base,
    required: required ? formStyles.label.required : '',
    subText: hasSubText ? formStyles.label.subText : '',
  }
}
