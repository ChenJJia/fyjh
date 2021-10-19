import { mount } from '@vue/test-utils'
import { TestTable } from '../table'

describe('Table', () => {
    const TableMount = options => mount(TestTable, options)

    test('render', () => {
        const wrapper = TableMount()
        // expect(wrapper.html()).toMatchSnapshot()
        expect(() => {
            wrapper.vm.$forceUpdate()
            wrapper.vm.$destroy()
        }).not.toThrow()
    })

    test('click sort', async () => {
        const options = {
            propsData: {
                options: {
                    data: [
                        { name: 'cjj', age: 18 },
                        { name: 'we', age: 32 },
                        { name: 'r', age: 43 },
                        { name: 'ew', age: 34 },
                        { name: 'fds', age: 5 },
                        { name: 'd', age: 43 },
                        { name: 'f', age: 5 },
                        { name: 'fzf', age: 23 },
                    ],
                    tableColumn: [
                        { label: '名字', index: 'name', sortFn: (item1, item2) => {
                            return item1.name > item2.name ? -1 : 1
                        }  },
                        { label: '年龄', index: 'age' },
                    ],
                    local: true,
                    limit: 2,
                    showPageColNum: 2,
                },
            },
        }
        const wrapper = TableMount(options)
        await wrapper.find('button.btn-asc').trigger('click')
        expect(wrapper.findComponent({ name: 'TableBody' }).vm.data.map(item => item.name).join('')).toBe('cjjd')

        await wrapper.find('button.btn-des').trigger('click')
        expect(wrapper.findComponent({ name: 'TableBody' }).vm.data.map(item => item.name).join('')).toBe('wer')

        await wrapper.find('button.btn-def').trigger('click')
        expect(wrapper.findComponent({ name: 'TableBody' }).vm.data.map(item => item.name).join('')).toBe('cjjwe')

        await wrapper.find('li.active').trigger('click')
    })

    // test('props test', () => {
    //     const wrapper = TableMount({
    //         propsData: {
    //             test: true,
    //         },
    //     })
    //
    //     expect(wrapper.find('.test-class').exists()).toBeTruthy()
    // })
})
