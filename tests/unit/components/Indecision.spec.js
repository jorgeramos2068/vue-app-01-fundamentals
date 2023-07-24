import { shallowMount } from '@vue/test-utils';
import Indecision from '@/components/Indecision';

describe('Indecision component', () => {
  let wrapper;
  let clgSpy;

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          answer: 'yes',
          forced: false,
          image: 'https://yesno.wtf/assets/yes/2.gif',
        }),
    })
  );

  beforeEach(() => {
    wrapper = shallowMount(Indecision);
    clgSpy = jest.spyOn(console, 'log');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should not call the getAnswer method when writting in the input without "?"', async () => {
    const getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer');
    const input = wrapper.find('input');
    await input.setValue('Test value');
    expect(clgSpy).toHaveBeenCalledTimes(1);
    expect(getAnswerSpy).not.toHaveBeenCalled();
  });

  it('should call the getAnswer method when writting the "?" character in the input', async () => {
    const getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer');
    const input = wrapper.find('input');
    await input.setValue('Test value?');
    expect(clgSpy).toHaveBeenCalledTimes(1);
    expect(getAnswerSpy).toHaveBeenCalled();
  });

  it('should call the getAnswer() method with a successful response', async () => {
    await wrapper.vm.getAnswer();
    expect(wrapper.vm.answer).toBe('yes');
    expect(wrapper.vm.image).toBe('https://yesno.wtf/assets/yes/2.gif');
    const img = wrapper.find('img');
    expect(img.exists()).toBeTruthy();
  });

  it('should call the getAnswer() method with an errored response', async () => {
    fetch.mockImplementationOnce(() => Promise.reject('API is down'));
    await wrapper.vm.getAnswer();
    const img = wrapper.find('img');
    expect(img.exists()).toBeFalsy();
    expect(wrapper.vm.answer).toBe('Error while loading...');
    expect(wrapper.vm.image).toBeNull();
  });
});
