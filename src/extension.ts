'use strict';

import * as vscode from 'vscode';
import Window = vscode.window;
import Range = vscode.Range;
import Selection = vscode.Selection;
import TextDocument = vscode.TextDocument;
import TextEditor = vscode.TextEditor;

export function activate(context: vscode.ExtensionContext) {

	console.log('vscode-uriencode" is now active');

	let encode = vscode.commands.registerCommand('extension.uriEncode', () => {    
        let e = Window.activeTextEditor;
		let d = e.document;
		let sel = e.selections;
        uriEncode(e, d, sel);
	});
    
    let decode = vscode.commands.registerCommand('extension.uriDecode', () => {    
        let e = Window.activeTextEditor;
		let d = e.document;
		let sel = e.selections;
        uriDecode(e, d, sel);
	});

	context.subscriptions.push(encode);
}

function uriEncode(e: TextEditor, d: TextDocument, sel: Selection[]) {
    for (var i in sel) {
        e.edit(function(edit) {
			let txt: string = d.getText(new Range(sel[i].start, sel[i].end));
            let b: string = encodeURIComponent(txt)
			edit.replace(sel[i], b);
		});
    }
}

function uriDecode(e: TextEditor, d: TextDocument, sel: Selection[]) {
    for (var i in sel) {
		e.edit(function(edit) {
			let txt: string = d.getText(new Range(sel[i].start, sel[i].end));
            let b: string = decodeURIComponent(txt)
			edit.replace(sel[i], b);
		});
	}
}

export function deactivate() {
}