import { shallowMount } from '@vue/test-utils';
import Counter from '@/components/Counter';

describe('Counter component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Counter);
  });

  it('should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should have the default value for the title', () => {
    const h2 = wrapper.find('h2');
    expect(h2).toBeTruthy();
    expect(h2.text()).toBe('Counter');
  });

  it('should show the correct value for the title', () => {
    const title = 'Test title';
    const wrapper = shallowMount(Counter, {
      props: { title },
    });
    const h2 = wrapper.find('h2');
    expect(h2).toBeTruthy();
    expect(h2.text()).toBe(title);
  });

  it('should have the default counter value for the second paragraph', () => {
    const pTags = wrapper.findAll('p');
    expect(pTags.length).toBe(2);
    expect(pTags[1].text()).toBe('100');
  });

  it('should have the default counter value for the testid paragraph', () => {
    const pTag = wrapper.find('[data-testid="counter"]');
    expect(pTag).toBeTruthy();
    expect(pTag.text()).toBe('100');
  });

  it('should increase the counter', async () => {
    const increaseBtn = wrapper.findAll('button')[0];
    await increaseBtn.trigger('click');
    await increaseBtn.trigger('click');
    expect(wrapper.find('[data-testid="counter"]').text()).toBe('102');
  });

  it('should decrease the counter', async () => {
    const increaseBtn = wrapper.findAll('button')[1];
    await increaseBtn.trigger('click');
    await increaseBtn.trigger('click');
    expect(wrapper.find('[data-testid="counter"]').text()).toBe('98');
  });

  it('should set the counter value', () => {
    const start = 10;
    const wrapper = shallowMount(Counter, {
      props: { start },
    });
    const pTag = wrapper.find('[data-testid="counter"]');
    expect(pTag).toBeTruthy();
    expect(pTag.text()).toBe(`${start}`);
  });
});
