import { App, Notice, Plugin, PluginSettingTab, Setting, TFile } from 'obsidian';
import { convertPathToHtmlFragment } from 'utility';

interface PluginSettings {
  showFileName: boolean;
  showIcons: boolean;
}

const DEFAULT_SETTINGS: PluginSettings = {
  showFileName: false,
  showIcons: true,
};

export default class FilePathPlugin extends Plugin {
  settings: PluginSettings;

  async onload() {
    await this.loadSettings();
    const statusBarItem = this.addStatusBarItem();

    const showFile = (file: TFile) => {
      if (!file) return;
      const pathToDisplay = this.settings.showFileName
        ? file.path
        : file.parent.path;
      const fragment = convertPathToHtmlFragment(
        pathToDisplay,
        this.settings.showFileName,
        this.settings.showIcons
      );
      statusBarItem.innerHTML = '';
      statusBarItem.appendChild(fragment);
    };

    this.registerEvent(
      this.app.workspace.on('file-open', showFile)
    );
    this.registerEvent(
      this.app.vault.on('rename', file => {
        if (file instanceof TFile && file === this.app.workspace.getActiveFile()) showFile(file);
      })
    );
    this.addSettingTab(new SettingsTab(this.app, this));

    statusBarItem.classList.add('mod-clickable');
    statusBarItem.addEventListener('click', () => {
      const activeFile = this.app.workspace.getActiveFile();
      const textToCopy = this.settings.showFileName
      ? activeFile.path
      : activeFile.parent.path;
      navigator.clipboard.writeText(textToCopy).then(() => {
        new Notice("Path copied to clipboard");
      });
    });
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

    new Setting(containerEl)
      .setName('Show icons')
      .setDesc('Show folder and file icons')
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.showIcons)
          .onChange(async (value) => {
            this.plugin.settings.showIcons = value;
            await this.plugin.saveSettings();
          })
      );
  }
}
