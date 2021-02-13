type EpicOptions = {
  name?: string;
  description?: string;
};

class Epic {
  name?: string;
  description?: string

  constructor(options: EpicOptions) {
    this.name = options.name;
  }
}

export default Epic;
