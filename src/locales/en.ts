export default {
  $vuetify: {
    open: 'Open',
    close: 'Close',
    input: {
      clear: 'Clear',
    },
    pagination: {
      ariaLabel: {
        root: 'Pagination Navigation',
        previous: 'Prev',
        next: 'Next',
        currentPage: 'Pagination Current Page',
        page: 'Page',
      },
    },
    dataFooter: {
      pageText: 'Page',
      itemsPerPageText: 'Items per page',
      nextPage: 'Next page',
      prevPage: 'Previous page',
      lastPage: 'Last page',
      firstPage: 'First page',
      itemsPerPageAll: 'All',
    },
  },
  messages: {
    copied: 'Copied',
    checkFields: 'Check the data in the fields!',
    login: 'Authorization is successful!',
    logout: 'You are logged out',
    register: 'Registration is successful!',
    emailSent: 'The email has been sent!',
    language: 'Language - english',
  },
  errors: {
    default: 'An error has occurred',
    incorrect: 'Incorrect data!',
    tokenNotFound: 'There is no password reset token!',
  },
  header: {
    title: 'Login/Register',
    auth: 'Authorization',
    name: 'First name',
    password: 'Password',
    passwordConfirmation: 'Repeat password',
    forgot: 'Forgot your password?',
    register: 'Registration',
    login: 'Login',
    registerConfirm: 'Register',
    social: 'Or log in using social networks:',
    profile: 'My profile',
    logout: 'Logout',
    resetTitle: 'Reset password',
    reset: 'Reset',
  },
  footer: {
    image: 'Background image by ',
    rights: 'All rights reserved',
  },
  resetPassword: {
    title: 'Password change',
    password: 'Enter a new password',
    passwordConfirmation: 'Repeat the new password',
    save: 'Save a new password',
  },
  index: {
    welcome: 'Welcome to LinkCrop!',
    description: 'A convenient way to shorten and manage your links.',
    advantages: {
      header: 'Our advantages',
      adv1: {
        header: 'Quickness',
        description: 'Shortening links in seconds.',
      },
      adv2: {
        header: 'Grouping',
        description: 'The ability to create and assign groups for links, as well as filtering by them.',
      },
      adv3: {
        header: 'Statistics',
        description: 'The functionality of viewing the full statistics of clicks on your links.',
      },
      adv4: {
        header: 'Convenience',
        description: 'Fast, intuitive and user-friendly interface.',
      },
    },
    usage: {
      header: 'How can I use our service?',
      description: 'Find out how shortened links can help you optimize your work and make your tasks more efficient.',
    },
    examples: {
      ex1: {
        header: 'For marketing',
        description: 'Track the effectiveness of your advertising campaigns and optimize your budgets.',
      },
      ex2: {
        header: 'For bloggers',
        description: 'Share short and convenient links on social media for your audience.',
      },
      ex3: {
        header: 'For business',
        description: 'Get analytics and improve customer engagement.',
      },
      ex4: {
        header: 'For everyone',
        description: 'Link shortening is simple, fast and convenient for any purpose.',
      },
    },
    start: "Let's get started",
  },
  profile: {
    search: 'Search',
    whereSearch: 'Where?',
    searchOptions: {
      title: 'Title',
      description: 'Description',
      redirect: 'Redirect url',
      endpoint: 'Endpoint',
      linksCount: 'Links count',
    },
    sortOrder: 'Sort order',
    sort: 'Sort',
    sortOptions: {
      title: 'Title',
      description: 'Description',
      endpoint: 'Endpoint',
      linksCount: 'Links count',
    },
    defaultGroupSelect: 'All',
    buttons: {
      save: 'Save',
      delete: 'Delete',
      reset: 'Reset fields',
    },
    nothingFound: 'Nothing found',
    links: {
      title: 'Links',
      header: 'Links list',
      create: 'Create link',
      table: {
        title: 'Title:',
        endpoint: 'Endpoint:',
        description: 'Description:',
        groups: 'Groups:',
        buttons: {
          stat: 'Open link stats',
          copy: 'Copy link',
        },
      },
      form: {
        header: 'New link creation',
        title: 'Title',
        redirect: 'Where to redirect to?',
        description: 'Description',
        groups: 'Groups',
        createdAt: 'Creation date',
      }
    },
    groups: {
      title: 'Groups',
      header: 'Groups list',
      create: 'Create group',
      table: {
        title: 'Title:',
        linksCount: 'Links in group:',
        description: 'Description:',
      },
      form: {
        header: 'New group creation',
        title: 'Title',
        description: 'Description',
        createdAt: 'Creation date',
      }
    },
    admin: {
      title: 'Admin panel',
      tabs: {
        users: 'Users',
        links: 'Links',
        groups: 'Groups',
        permissions: 'Permissions',
      },
      users: {
        name: 'User name',
        createdAt: 'Registration date',
      },
      groupsId: 'Groups ID',
      usersId: 'Users ID',
      roleList: 'Role list',
      roles: {
        admin: 'Admin',
        user: 'User',
      },
      forms: {
        user: 'User',
        group: 'Group',
        link: 'Link',
        emailConfirmation: 'Email confirmed',
        emailNotConfirmed: 'Email not confirmed',
        role: 'Role',
        checkAll: 'Check all',
        uncheck: 'Uncheck all',
      },
    },
    settings: {
      title: 'Settings',
      header: 'Profile Settings',
      welcome: 'Hello, ',
      subtitle: 'Here you can confirm your email address or change your password.',
      email: 'Email address',
      verifyEmail: 'Confirm email!',
      sendBtn: 'Send confirmation',
      passwordChange: 'Password Change',
      resetBtn: 'Reset Password',
    },
    stats: {
      header: 'Link statistics',
      total: 'Total',
      noData: 'There is no data on clicks on this link!',
      dataLabel: 'Transitions',
    },
    deleteModal: {
      header: 'Deletion',
      confirmation: 'Are you sure?',
      yes: 'Yes',
      no: 'No',
    },
  }
};
