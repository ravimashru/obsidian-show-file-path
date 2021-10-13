# obsidian-show-file-path

This is a plugin for [Obsidian](https://obsidian.md/) that shows the full file path of the currently open file in the status bar.

If there are multiple files open in panes, the path of the one that currently has focus is shown.

## Features

- Show icons for each part of the path (folders and file)
- Show/hide the name of the file in the path
- Click the path (in the status bar) to copy it to the clipboard
- Use "Show Current File Path: Copy path" command to copy path to the clipboard
- Copy relative or absolute path of file based on setting

## Limitations

The status bar is not visible in the mobile app and therefore the file path will not be displayed.

The plugin is still marked as compatible for mobile as the command to copy the file path still works on Android (but not iOS/iPadOS).
