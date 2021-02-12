import { App, Plugin, PluginSettingTab, Setting } from 'obsidian';

interface PluginSettings {
  showFileName: boolean;
}

const DEFAULT_SETTINGS: PluginSettings = {
  showFileName: false,
};

export default class FilePathPlugin extends Plugin {
  settings: PluginSettings;

  async onload() {
    await this.loadSettings();
    const statusBarItem = this.addStatusBarItem();

    this.registerEvent(
      this.app.workspace.on('file-open', (file) => {
        const pathToDisplay = this.settings.showFileName
          ? file.path
          : file.parent.path;
        statusBarItem.setText(pathToDisplay);
      })
    );

    this.addSettingTab(new SettingsTab(this.app, this));
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}

class SettingsTab extends PluginSettingTab {
  constructor(public app: App, private plugin: FilePathPlugin) {
    super(app, plugin);
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl('h2', { text: 'Settings' });

    new Setting(containerEl)
      .setName('Show file name')
      .setDesc('Include name of open file in the path')
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.showFileName)
          .onChange(async (value) => {
            this.plugin.settings.showFileName = value;
            await this.plugin.saveSettings();
          })
      );
  }
}
