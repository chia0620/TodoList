var componentA = {
    props: ["item", "value"],
    model: {
        prop: "value",
        event: "input"
    },
    template: `
        <li v-bind:class="[item.complete?  'float-bottom': '']"
            v-on:blur="item.editMode = !item.editMode"
            v-on:dblclick="$emit('edit-item-button')"
            v-on:keyup.escape="$emit('cancel-edit-button')"
            v-on:keyup.enter="$emit('save-button')">
            <input v-bind:id="'complete_checkbox_'+item.id" type="checkbox" v-model="item.complete">
            <label v-if="!item.editMode" v-bind:for="'complete_checkbox_'+item.id">
            {{item.title}}
            </label>            
            <button class="float-right delete-button"
                    v-on:click="$emit('delete-item')"
                    v-if="!item.editMode"></button>
           
            <input type="text" 
                    v-bind:value="value" 
                    v-on:input="$emit('input',$event.target.value)"
                    v-if="item.editMode">
            <button class="float-right save-button"
                    v-on:click="$emit('save-button')"
                    v-if="item.editMode"></button>
        </li>
    `
}

var vm = new Vue({
    el: "#app",
    components: {
        'component-a': componentA
    },
    data: {
        items: [
            { title: '餵貓', complete: false },
            { title: '與教授聯絡', complete: false },
            { title: '購買日常用品', complete: true },
        ],
        addItem: "",
        editTitle: ""
    },
    computed: {
    },
    methods: {
        addItems: function() {
            if (this.addItem) {
                var newItem = {
                    "title": this.addItem,
                    "editMode": false,
                    "id": new Date().valueOf()
                };
                this.items.push(newItem);
                this.addItem = "";
            }
        },
        deleteItem: function(index) {
            this.items.splice(index, 1);
        },
        toggleEditItem: function(index) {
            if (this.items[index].editMode) {
                this.items[index].editMode = false;
            } else {
                this.items[index].editMode = true;
            }
        },
        cancelEditMode: function() {
            this.items.forEach(function(item) {
                item.editMode = false;
            })
        },
        editItem: function(index) {
            this.cancelEditMode();
            this.toggleEditItem(index);
            this.editTitle = this.items[index].title;
        },
        cancelEditItem: function(index) {
            this.toggleEditItem(index);
            this.editTitle = "";
        },
        saveEditItem: function(index) {
            this.toggleEditItem(index);
            this.items[index].title = this.editTitle;
            this.editTitle = "";
        }
    },
    beforeMount() {
        var self = this;
        this.items.map(function(item, index) {
            Vue.set(self.items[index], "editMode", false);
            Vue.set(self.items[index], "id", index);
        })
    },
})