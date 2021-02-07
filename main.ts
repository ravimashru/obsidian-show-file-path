import { Plugin } from 'obsidian';

export default class MyPlugin extends Plugin {
  async onload() {
    const statusBarItem = this.addStatusBarItem();

    this.registerEvent(
      this.app.workspace.on('file-open', (file) => {
        statusBarItem.setText(file.path);
      })
    );
  }
}
