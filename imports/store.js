import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    selectedGroup: {},
    selectedLabels: [],
    showCategories: false,
    currentOrganizationId: 0,
    currentProjectId: 0,
    hideDrawer: false
  },
  getters: {
    // Compute derived state based on the current state. More like computed property.
  },
  mutations: {
    updateSelectedGroup(state, selectedGroup) {
      state.selectedGroup = selectedGroup
    },
    updateShowCategories(state, showCategories) {
      state.showCategories = showCategories
    },
    updateCurrentProjectId(state, currentProjectId) {
      state.currentProjectId = currentProjectId;
    },
    updateCurrentOrganizationId(state, currentOrganizationId) {
      state.currentOrganizationId = currentOrganizationId;
    },
    updateHideDrawer(state, hideDrawer) {
      state.hideDrawer = hideDrawer
    },

    selectLabel(state, label) {
      var alreadySelected = state.selectedLabels.some( aLabel => {
        return aLabel._id == label._id;
      });
      if (!alreadySelected) {
        state.selectedLabels.push(label);
      } else {
        state.selectedLabels = state.selectedLabels.filter( aLabel => {
          return aLabel._id != label._id
        });
      }
    },
    clearSelectedLabels(state) {
      state.selectedLabels = [];
    },
    clearSelectedGroup(state) {
      state.selectedGroup = {};
    }
  },
  actions: {
    setSelectedGroup (context, selectedGroup) {
      if (!selectedGroup) {
        selectedGroup = {};
      }
      context.commit('updateSelectedGroup', selectedGroup);
    },
    setShowCategories (context, showCategories) {
      context.commit('updateShowCategories', showCategories);
    },
    setCurrentProjectId (context, projectId) {
      context.commit('clearSelectedLabels');
      context.commit('updateCurrentProjectId', projectId);
    },
    setCurrentOrganizationId (context, organizationId) {
      context.commit('clearSelectedGroup');
      context.commit('updateCurrentOrganizationId', organizationId);
    },
    setHideDrawer (context, hideDrawer) {
      context.commit('updateHideDrawer', hideDrawer);
    },
    selectLabel(context, label) {
      context.commit('selectLabel', label);
    },

  }
});
